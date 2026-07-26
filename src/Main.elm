port module Main exposing (Flags, Game, Id, Model, Msg, SavedSettings, main)

import Angle
import Block3d exposing (Block3d)
import Browser
import Browser.Events
import Camera3d
import Color exposing (Color)
import Css
import Density
import Direction3d
import Duration exposing (Duration)
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Http
import Json.Decode
import Length
import LineSegment3d
import LuminousFlux
import Obj.Decode
import Physics exposing (onEarth)
import Physics.Material
import Physics.Shape
import Pixels
import Plane3d
import Point3d exposing (Point3d)
import Quantity
import Random
import Scene3d
import Scene3d.Light
import Scene3d.Material
import Scene3d.Mesh
import Set exposing (Set)
import Sphere3d exposing (Sphere3d)
import Task exposing (Task)
import Timestep exposing (Timestep)
import Torque
import Vector3d


main : Program Flags Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flags =
    { initialSeed : Int
    , width : Int
    , height : Int
    , savedSettings : SavedSettings
    , bestScore : Json.Decode.Value
    }


type alias SavedSettings =
    { musicEnabled : Bool
    , soundEffectsEnabled : Bool
    , musicVolume : Float
    , soundEffectsVolume : Float
    }


type Id
    = Ball
    | FloorPiece Int
    | Wall


type alias Model =
    { seed : Random.Seed
    , width : Int
    , height : Int
    , game : Game
    , showSettings : Bool
    , musicEnabled : Bool
    , soundEffectsEnabled : Bool
    , musicVolume : Float
    , soundEffectsVolume : Float
    , bestScore : Maybe Int
    }


type Game
    = Loading
    | Failure String
    | Loaded LoadedGame


type alias LoadedGame =
    { player : Physics.Body
    , bodies : List ( Id, Physics.Body )
    , contacts : Physics.Contacts Id
    , timestep : Timestep
    , floors : List (Scene3d.Entity Physics.WorldCoordinates)
    , floorCount : Int
    , keysDown : Set String
    , assets : Assets
    , currentGoal : ( GoalFrame, Float )
    , upcomingGoals : List GoalFrame
    , previousGoals : List ( GoalFrame, Float, Duration )
    , remainingTime : Duration
    , stage : Stage
    }


type Stage
    = MainMenu
    | Playing PlayState


type PlayState
    = Falling
    | Paused
    | TimeRanOut


type alias GoalFrame =
    Frame3d Length.Meters Physics.WorldCoordinates { defines : Physics.BodyCoordinates }


type alias Assets =
    { ballMesh : Scene3d.Mesh.Textured Physics.BodyCoordinates
    , ballShadow : Scene3d.Mesh.Shadow Physics.BodyCoordinates
    , ballMaterial : Scene3d.Material.Textured Physics.BodyCoordinates
    , holeMesh : Scene3d.Mesh.Textured Physics.BodyCoordinates
    , holeShadow : Scene3d.Mesh.Shadow Physics.BodyCoordinates
    , goalRingMesh : Scene3d.Mesh.Textured Physics.BodyCoordinates
    }


init : Flags -> ( Model, Cmd Msg )
init { initialSeed, width, height, savedSettings, bestScore } =
    ( { seed = Random.initialSeed initialSeed
      , width = width
      , height = height
      , game = Loading
      , showSettings = False
      , musicEnabled = savedSettings.musicEnabled
      , soundEffectsEnabled = savedSettings.soundEffectsEnabled
      , musicVolume = savedSettings.musicVolume
      , soundEffectsVolume = savedSettings.soundEffectsVolume
      , bestScore =
            case
                Json.Decode.decodeValue
                    (Json.Decode.nullable
                        (Json.Decode.andThen
                            (\s ->
                                case String.toInt s of
                                    Nothing ->
                                        Json.Decode.fail "Expected an int"

                                    Just i ->
                                        Json.Decode.succeed i
                            )
                            Json.Decode.string
                        )
                    )
                    bestScore
            of
                Err _ ->
                    Nothing

                Ok best ->
                    best
      }
    , Task.map4 (\a b c d -> ( ( a, b ), c, d ))
        (getMesh "ball")
        (Scene3d.Material.load "assets/ball.png"
            |> Task.mapError (\_ -> "Failed to load texture")
        )
        (getMesh "hole")
        (getMesh "goal_ring")
        |> Task.attempt AssetsLoaded
    )


getMesh : String -> Task String (Scene3d.Mesh.Textured coordinates)
getMesh name =
    Http.task
        { method = "GET"
        , headers = []
        , url = "assets/" ++ name ++ ".obj"
        , body = Http.emptyBody
        , resolver = meshResolver
        , timeout = Nothing
        }
        |> Task.mapError (\_ -> "Failed to load " ++ name ++ " obj")


meshResolver : Http.Resolver Http.Error (Scene3d.Mesh.Textured coordinates)
meshResolver =
    Http.stringResolver
        (\response ->
            case response of
                Http.BadUrl_ url ->
                    Err (Http.BadUrl url)

                Http.Timeout_ ->
                    Err Http.Timeout

                Http.NetworkError_ ->
                    Err Http.NetworkError

                Http.BadStatus_ metadata _ ->
                    Err (Http.BadStatus metadata.statusCode)

                Http.GoodStatus_ _ body ->
                    let
                        units =
                            Length.meters

                        decoder =
                            Obj.Decode.map Scene3d.Mesh.texturedFaces
                                (Obj.Decode.texturedFacesIn Frame3d.atOrigin)
                    in
                    case Obj.Decode.decodeString units decoder body of
                        Ok value ->
                            Ok value

                        Err string ->
                            Err (Http.BadBody string)
        )


nextFloor :
    Int
    -> Random.Seed
    ->
        { entity : Scene3d.Entity Physics.WorldCoordinates
        , bodies : List ( Id, Physics.Body )
        , floorCount : Int
        , seed : Random.Seed
        , hole : ( Float, Float )
        }
nextFloor floorCount seed =
    let
        ( hole, nextSeed ) =
            Random.step nextHole seed

        ( holeX, holeY ) =
            hole

        floor =
            generateFloor hole

        floorBlocks =
            List.filterMap identity
                [ floor.leftOfHole
                , floor.rightOfHole
                , floor.forwardOfHole
                , floor.backwardOfHole
                ]

        zOffset =
            Vector3d.meters 0 0 (toFloat floorCount * floorSpacing)
    in
    { entity =
        floorBlocks
            |> List.map
                (Scene3d.blockWithShadow
                    (Scene3d.Material.matte Color.white)
                )
            |> Scene3d.group
            |> Scene3d.placeIn Frame3d.atOrigin
            |> Scene3d.translateBy zOffset
    , bodies =
        List.map
            (\block ->
                ( FloorPiece floorCount
                , Physics.static
                    [ ( Physics.Shape.block block
                      , Physics.Material.wood
                      )
                    ]
                    |> Physics.translateBy zOffset
                )
            )
            floorBlocks
    , floorCount = floorCount + 1
    , seed = nextSeed
    , hole = ( toFloat holeX, toFloat holeY )
    }


floorSpacing : Float
floorSpacing =
    -3


maxExtent : Float
maxExtent =
    1.5


intExtent : Int
intExtent =
    floor maxExtent


nextHole : Random.Generator ( Int, Int )
nextHole =
    Random.map2 Tuple.pair
        (Random.int -intExtent intExtent)
        (Random.int -intExtent intExtent)


initTimestep : Timestep
initTimestep =
    Timestep.init
        { duration = Duration.seconds (1 / 60)
        , maxSteps = 2
        }


type alias Floor =
    { leftOfHole : Maybe (Block3d Length.Meters Physics.BodyCoordinates)
    , rightOfHole : Maybe (Block3d Length.Meters Physics.BodyCoordinates)
    , forwardOfHole : Maybe (Block3d Length.Meters Physics.BodyCoordinates)
    , backwardOfHole : Maybe (Block3d Length.Meters Physics.BodyCoordinates)
    }


generateFloor : ( Int, Int ) -> Floor
generateFloor ( holeX, holeY ) =
    { leftOfHole =
        if holeY < intExtent then
            Block3d.with
                { x1 = Length.meters maxExtent
                , y1 = Length.meters maxExtent
                , z1 = Length.meters 0
                , x2 = Length.meters -maxExtent
                , y2 = Length.meters (toFloat holeY + 0.5)
                , z2 = Length.meters -0.3
                }
                |> Just

        else
            Nothing
    , rightOfHole =
        if holeY > -intExtent then
            Block3d.with
                { x1 = Length.meters maxExtent
                , y1 = Length.meters (toFloat holeY - 0.5)
                , z1 = Length.meters 0
                , x2 = Length.meters -maxExtent
                , y2 = Length.meters -maxExtent
                , z2 = Length.meters -0.3
                }
                |> Just

        else
            Nothing
    , forwardOfHole =
        if holeX < intExtent then
            Block3d.with
                { x1 = Length.meters maxExtent
                , y1 = Length.meters (toFloat holeY + 0.5)
                , z1 = Length.meters 0
                , x2 = Length.meters (toFloat holeX + 0.5)
                , y2 = Length.meters (toFloat holeY + -0.5)
                , z2 = Length.meters -0.3
                }
                |> Just

        else
            Nothing
    , backwardOfHole =
        if holeX > -intExtent then
            Block3d.with
                { x1 = Length.meters (toFloat holeX - 0.5)
                , y1 = Length.meters (toFloat holeY + 0.5)
                , z1 = Length.meters 0
                , x2 = Length.meters -maxExtent
                , y2 = Length.meters (toFloat holeY + -0.5)
                , z2 = Length.meters -0.3
                }
                |> Just

        else
            Nothing
    }


playerSphere : Sphere3d Length.Meters Physics.BodyCoordinates
playerSphere =
    Sphere3d.atPoint (Point3d.meters 0 0 0)
        (Length.meters 0.25)


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ Browser.Events.onAnimationFrameDelta (\d -> Tick (Duration.milliseconds d))
        , Browser.Events.onKeyDown
            (Json.Decode.map KeyDown
                (Json.Decode.field "key" Json.Decode.string)
            )
        , Browser.Events.onKeyUp
            (Json.Decode.map KeyUp
                (Json.Decode.field "key" Json.Decode.string)
            )
        , Browser.Events.onResize BrowserResized
        , Browser.Events.onVisibilityChange BrowserVisibilityChanged
        ]


port playSound : { sound : String, volume : Float } -> Cmd msg


port startMusic : { track : String, volume : Float } -> Cmd msg


port musicVolumeSet : Float -> Cmd msg


port stopMusic : String -> Cmd msg


port resumeMusic : String -> Cmd msg


port saveSettings : SavedSettings -> Cmd msg


port saveScore : Int -> Cmd msg


type Msg
    = AssetsLoaded
        (Result
            String
            ( ( Scene3d.Mesh.Textured Physics.BodyCoordinates
              , Scene3d.Material.Texture Color
              )
            , Scene3d.Mesh.Textured Physics.BodyCoordinates
            , Scene3d.Mesh.Textured Physics.BodyCoordinates
            )
        )
    | BrowserResized Int Int
    | BrowserVisibilityChanged Browser.Events.Visibility
    | UserClickedStart
    | UserUnpaused
    | UserOpenedSettings
    | UserClosedSettings
    | UserToggledMusicEnabled Bool
    | UserToggledSoundEffectsEnabled Bool
    | UserChangedMusicVolume String
    | UserChangedSoundEffectsVolume String
    | Tick Duration
    | KeyDown String
    | KeyUp String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        BrowserResized width height ->
            ( { model | width = width, height = height }, Cmd.none )

        AssetsLoaded (Err err) ->
            case model.game of
                Loading ->
                    ( { model | game = Failure err }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        AssetsLoaded (Ok ( ( ballMesh, ballTexture ), holeMesh, goalRingMesh )) ->
            case model.game of
                Loading ->
                    let
                        assets =
                            { ballMesh = ballMesh
                            , ballShadow = Scene3d.Mesh.shadow ballMesh
                            , ballMaterial = Scene3d.Material.texturedMatte ballTexture
                            , holeMesh = holeMesh
                            , holeShadow = Scene3d.Mesh.shadow holeMesh
                            , goalRingMesh = goalRingMesh
                            }
                    in
                    ( { model
                        | game =
                            Loaded
                                { stage = MainMenu
                                , player = initPlayer
                                , bodies = []
                                , contacts = Physics.emptyContacts
                                , timestep = initTimestep
                                , floors = []
                                , floorCount = 0
                                , keysDown = Set.empty
                                , assets = assets
                                , currentGoal =
                                    ( Frame3d.atOrigin
                                    , 0
                                    )
                                , upcomingGoals = []
                                , previousGoals = []
                                , remainingTime = initTimer
                                }
                      }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        UserClickedStart ->
            case model.game of
                Loaded game ->
                    case game.stage of
                        MainMenu ->
                            initNewGame model game
                                |> Tuple.mapSecond
                                    (\cmd ->
                                        Cmd.batch
                                            [ cmd
                                            , startMusic
                                                { track = "song_2"
                                                , volume = 0.5
                                                }
                                            ]
                                    )

                        Playing TimeRanOut ->
                            let
                                currentScore =
                                    game.player
                                        |> Physics.frame
                                        |> Frame3d.originPoint
                                        |> Point3d.zCoordinate
                                        |> Length.inMeters
                                        |> floor
                            in
                            initNewGame
                                { model
                                    | bestScore =
                                        Just <|
                                            case model.bestScore of
                                                Nothing ->
                                                    currentScore

                                                Just bestScore ->
                                                    if currentScore < bestScore then
                                                        currentScore

                                                    else
                                                        bestScore
                                }
                                game

                        Playing _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        Tick delta ->
            case model.game of
                Loaded game ->
                    case game.stage of
                        MainMenu ->
                            ( model, Cmd.none )

                        Playing TimeRanOut ->
                            ( model, Cmd.none )

                        Playing Paused ->
                            ( model, Cmd.none )

                        Playing Falling ->
                            if Quantity.lessThanOrEqualToZero game.remainingTime then
                                let
                                    currentScore =
                                        game.player
                                            |> Physics.frame
                                            |> Frame3d.originPoint
                                            |> Point3d.zCoordinate
                                            |> Length.inMeters
                                            |> floor
                                in
                                ( { model
                                    | game = Loaded { game | stage = Playing TimeRanOut }
                                  }
                                , case model.bestScore of
                                    Nothing ->
                                        saveScore currentScore

                                    Just bestScore ->
                                        if currentScore < bestScore then
                                            saveScore currentScore

                                        else
                                            Cmd.none
                                )

                            else
                                let
                                    ( nextGame, nextModel, goalMade ) =
                                        updateFloors delta
                                            (Timestep.advance simulateStep delta game)
                                            model

                                    ballHits =
                                        nextGame.contacts
                                            |> Physics.contactPoints (\id1 id2 -> id1 == Ball || id2 == Ball)
                                            |> List.foldl
                                                (\( _, _, contacts ) ->
                                                    (++)
                                                        (List.filterMap
                                                            (\{ impulse } ->
                                                                if Quantity.unwrap impulse > 65 then
                                                                    Just
                                                                        (playSound
                                                                            { sound = "ball_hit"
                                                                            , volume = 0.3
                                                                            }
                                                                        )

                                                                else
                                                                    Nothing
                                                            )
                                                            contacts
                                                        )
                                                )
                                                []
                                in
                                ( nextModel
                                , Cmd.batch
                                    [ Cmd.batch ballHits
                                    , if goalMade then
                                        playSound
                                            { sound = "goal_made"
                                            , volume = 0.4
                                            }

                                      else
                                        Cmd.none
                                    ]
                                )

                _ ->
                    ( model, Cmd.none )

        BrowserVisibilityChanged Browser.Events.Visible ->
            ( model, Cmd.none )

        BrowserVisibilityChanged Browser.Events.Hidden ->
            case model.game of
                Loaded game ->
                    case game.stage of
                        Playing Falling ->
                            ( { model | game = Loaded { game | stage = Playing Paused } }, Cmd.none )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        UserUnpaused ->
            case model.game of
                Loaded game ->
                    case game.stage of
                        Playing Paused ->
                            ( { model | game = Loaded { game | stage = Playing Falling } }
                            , playSound
                                { sound = "menu_select"
                                , volume = 0.15
                                }
                            )

                        _ ->
                            ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        UserOpenedSettings ->
            ( { model | showSettings = True }, Cmd.none )

        UserClosedSettings ->
            ( { model | showSettings = False }
            , saveSettings
                { musicEnabled = model.musicEnabled
                , soundEffectsEnabled = model.soundEffectsEnabled
                , musicVolume = model.musicVolume
                , soundEffectsVolume = model.soundEffectsVolume
                }
            )

        UserToggledMusicEnabled enabled ->
            ( { model | musicEnabled = enabled }
            , if enabled then
                resumeMusic "song_2"

              else
                stopMusic "song_2"
            )

        UserToggledSoundEffectsEnabled enabled ->
            ( { model | soundEffectsEnabled = enabled }, Cmd.none )

        UserChangedMusicVolume volumeStr ->
            let
                musicVolume =
                    String.toFloat volumeStr
                        |> Maybe.withDefault model.musicVolume
            in
            ( { model
                | musicVolume = musicVolume
              }
            , musicVolumeSet musicVolume
            )

        UserChangedSoundEffectsVolume volumeStr ->
            ( { model
                | soundEffectsVolume =
                    String.toFloat volumeStr
                        |> Maybe.withDefault model.soundEffectsVolume
              }
            , Cmd.none
            )

        KeyDown key ->
            case model.game of
                Loaded game ->
                    if key == "Escape" then
                        case game.stage of
                            Playing Paused ->
                                if model.showSettings then
                                    ( model, Cmd.none )

                                else
                                    ( { model | game = Loaded { game | stage = Playing Falling } }, Cmd.none )

                            Playing Falling ->
                                ( { model | game = Loaded { game | stage = Playing Paused } }, Cmd.none )

                            _ ->
                                ( model, Cmd.none )

                    else
                        ( { model | game = Loaded { game | keysDown = Set.insert key game.keysDown } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        KeyUp key ->
            case model.game of
                Loaded game ->
                    ( { model | game = Loaded { game | keysDown = Set.remove key game.keysDown } }, Cmd.none )

                _ ->
                    ( model, Cmd.none )


initNewGame : Model -> LoadedGame -> ( Model, Cmd Msg )
initNewGame model game =
    let
        fl1 =
            nextFloor 0 model.seed

        fl2 =
            nextFloor fl1.floorCount fl1.seed

        fl3 =
            nextFloor fl2.floorCount fl2.seed

        fl4 =
            nextFloor fl3.floorCount fl3.seed

        fl5 =
            nextFloor fl4.floorCount fl4.seed

        fl6 =
            nextFloor fl5.floorCount fl5.seed

        fl7 =
            nextFloor fl6.floorCount fl6.seed

        fl8 =
            nextFloor fl7.floorCount fl7.seed
    in
    ( { model
        | game =
            Loaded
                { stage = Playing Falling
                , player = initPlayer
                , bodies =
                    initWalls
                        ++ fl1.bodies
                        ++ fl2.bodies
                        ++ fl3.bodies
                        ++ fl4.bodies
                        ++ fl5.bodies
                        ++ fl6.bodies
                        ++ fl7.bodies
                        ++ fl8.bodies
                , contacts = Physics.emptyContacts
                , timestep = initTimestep
                , floors =
                    [ fl1.entity
                    , fl2.entity
                    , fl3.entity
                    , fl4.entity
                    , fl5.entity
                    , fl6.entity
                    , fl7.entity
                    , fl8.entity
                    ]
                , floorCount = fl8.floorCount
                , keysDown = Set.empty
                , assets = game.assets
                , currentGoal =
                    let
                        ( holeX, holeY ) =
                            fl1.hole
                    in
                    ( Frame3d.atPoint
                        (Point3d.meters holeX holeY 0)
                    , 0
                    )
                , upcomingGoals =
                    List.indexedMap
                        (\index ( holeX, holeY ) ->
                            Frame3d.atPoint
                                (Point3d.meters
                                    holeX
                                    holeY
                                    (toFloat (index + 1) * floorSpacing)
                                )
                        )
                        [ fl2.hole
                        , fl3.hole
                        , fl4.hole
                        , fl5.hole
                        , fl6.hole
                        , fl7.hole
                        , fl8.hole
                        ]
                , previousGoals = []
                , remainingTime = initTimer
                }
      }
    , playSound
        { sound = "menu_select"
        , volume = 0.15
        }
    )


initTimer : Duration
initTimer =
    Duration.seconds 30


initPlayer : Physics.Body
initPlayer =
    Physics.sphere
        playerSphere
        (Physics.Material.dense
            { density = Density.kilogramsPerCubicMeter 900
            , friction = 0.9
            , bounciness = 0.1
            }
        )
        |> Physics.translateBy (Vector3d.meters 0 0 2)
        |> Physics.damp
            { linear = 0.01
            , angular = 0.5
            }


initWalls : List ( Id, Physics.Body )
initWalls =
    [ ( Wall
      , Physics.plane
            (Plane3d.yz
                |> Plane3d.flip
                |> Plane3d.translateBy (Vector3d.meters maxExtent 0 0)
            )
            Physics.Material.wood
      )
    , ( Wall
      , Physics.plane
            (Plane3d.yz
                |> Plane3d.translateBy (Vector3d.meters -maxExtent 0 0)
            )
            Physics.Material.wood
      )
    , ( Wall
      , Physics.plane
            (Plane3d.zx
                |> Plane3d.flip
                |> Plane3d.translateBy (Vector3d.meters 0 maxExtent 0)
            )
            Physics.Material.wood
      )
    , ( Wall
      , Physics.plane
            (Plane3d.zx
                |> Plane3d.translateBy (Vector3d.meters 0 -maxExtent 0)
            )
            Physics.Material.wood
      )
    ]


maxFloors : Int
maxFloors =
    8


updateFloors : Duration -> LoadedGame -> Model -> ( LoadedGame, Model, Bool )
updateFloors delta game model =
    if Length.inMeters (Point3d.zCoordinate (Frame3d.originPoint (Physics.frame game.player))) < (toFloat (game.floorCount - maxFloors) * floorSpacing) then
        let
            newFloor =
                nextFloor game.floorCount model.seed

            ( holeX, holeY ) =
                newFloor.hole

            ( holeFrame, holeHue ) =
                game.currentGoal

            ( currentGoal, upcomingGoals ) =
                case game.upcomingGoals of
                    [] ->
                        ( game.currentGoal
                        , [ Frame3d.atPoint
                                (Point3d.meters
                                    holeX
                                    holeY
                                    (toFloat (newFloor.floorCount - 1) * floorSpacing)
                                )
                          ]
                        )

                    cg :: up ->
                        ( ( cg, 0 )
                        , up
                            ++ [ Frame3d.atPoint
                                    (Point3d.meters
                                        holeX
                                        holeY
                                        (toFloat (newFloor.floorCount - 1) * floorSpacing)
                                    )
                               ]
                        )

            nextGame =
                { game
                    | floorCount = newFloor.floorCount
                    , floors =
                        case game.floors of
                            [] ->
                                game.floors

                            _ :: restFloors ->
                                restFloors ++ [ newFloor.entity ]
                    , bodies =
                        newFloor.bodies
                            ++ List.filter
                                (\( id, _ ) ->
                                    case id of
                                        FloorPiece height ->
                                            height > (game.floorCount - maxFloors)

                                        _ ->
                                            True
                                )
                                game.bodies
                    , currentGoal = currentGoal
                    , upcomingGoals = upcomingGoals
                    , previousGoals =
                        List.filterMap
                            (animateGoals delta)
                            (( holeFrame
                             , holeHue
                             , goalLife
                             )
                                :: game.previousGoals
                            )
                    , remainingTime = game.remainingTime |> Quantity.minus delta
                }
        in
        ( nextGame
        , { model
            | seed = newFloor.seed
            , game = Loaded nextGame
          }
        , True
        )

    else
        let
            ( hole, holeHue ) =
                game.currentGoal

            newHue =
                holeHue + Duration.inSeconds delta / 2.5
        in
        ( game
        , { model
            | game =
                Loaded
                    { game
                        | currentGoal =
                            ( hole
                            , if newHue > 1 then
                                newHue - 1

                              else
                                newHue
                            )
                        , previousGoals =
                            List.filterMap
                                (animateGoals delta)
                                game.previousGoals
                        , remainingTime = game.remainingTime |> Quantity.minus delta
                    }
          }
        , False
        )


goalLife : Duration
goalLife =
    Duration.seconds 0.5


animateGoals : Duration -> ( GoalFrame, Float, Duration ) -> Maybe ( GoalFrame, Float, Duration )
animateGoals delta ( hole, hue, life ) =
    let
        remainingLife =
            life |> Quantity.minus delta
    in
    if remainingLife |> Quantity.greaterThan (Duration.seconds 0) then
        let
            newHue =
                hue + Duration.inSeconds delta / 2.5
        in
        Just
            ( hole
            , if newHue > 1 then
                newHue - 1

              else
                newHue
            , remainingLife
            )

    else
        Nothing


simulateStep : LoadedGame -> LoadedGame
simulateStep game =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | contacts = game.contacts
                    , duration = Timestep.duration game.timestep
                }
                (( Ball, updatePlayerBall game.keysDown game.player )
                    :: game.bodies
                )

        ( player, bodies ) =
            extractPlayer game.player newBodies
    in
    { game
        | player = player
        , bodies = bodies
        , contacts = newContacts
    }


extractPlayer : Physics.Body -> List ( Id, Physics.Body ) -> ( Physics.Body, List ( Id, Physics.Body ) )
extractPlayer defaultPlayer =
    extractPlayerHelper defaultPlayer []


extractPlayerHelper : Physics.Body -> List ( Id, Physics.Body ) -> List ( Id, Physics.Body ) -> ( Physics.Body, List ( Id, Physics.Body ) )
extractPlayerHelper defaultPlayer searched toSearch =
    case toSearch of
        [] ->
            ( defaultPlayer, searched )

        (( id, body ) as next) :: rest ->
            if id == Ball then
                ( body, searched ++ rest )

            else
                extractPlayerHelper defaultPlayer (next :: searched) rest


updatePlayerBall : Set String -> Physics.Body -> Physics.Body
updatePlayerBall keysDown body =
    let
        applyForward =
            Set.member "ArrowUp" keysDown || Set.member "w" keysDown

        applyBackward =
            Set.member "ArrowDown" keysDown || Set.member "s" keysDown

        applyLeft =
            Set.member "ArrowLeft" keysDown || Set.member "a" keysDown

        applyRight =
            Set.member "ArrowRight" keysDown || Set.member "d" keysDown
    in
    if applyForward || applyBackward || applyLeft || applyRight then
        let
            cameraFrame =
                Physics.frame body
                    |> Frame3d.originPoint
                    |> makeCamera
                    |> Camera3d.frame

            verticalParts =
                if applyForward && applyBackward then
                    { x = 0, y = 0, z = 0 }

                else if applyForward then
                    cameraFrame
                        |> Frame3d.xDirection
                        |> Direction3d.unwrap
                        |> (\p -> { x = -p.x, y = -p.y, z = 0 })

                else if applyBackward then
                    cameraFrame
                        |> Frame3d.xDirection
                        |> Direction3d.unwrap

                else
                    { x = 0, y = 0, z = 0 }

            horizontalParts =
                if applyLeft && applyRight then
                    { x = 0, y = 0, z = 0 }

                else if applyLeft then
                    cameraFrame
                        |> Frame3d.yDirection
                        |> Direction3d.unwrap
                        |> (\p -> { x = -p.x, y = -p.y, z = 0 })

                else if applyRight then
                    cameraFrame
                        |> Frame3d.yDirection
                        |> Direction3d.unwrap

                else
                    { x = 0, y = 0, z = 0 }
        in
        Physics.applyTorque
            (Vector3d.withLength
                (Torque.newtonMeters 150)
                (Direction3d.unsafe
                    { x = verticalParts.x + horizontalParts.x
                    , y = verticalParts.y + horizontalParts.y
                    , z = 0
                    }
                )
            )
            body

    else
        body


view : Model -> Browser.Document Msg
view model =
    { title = "Ball Fall"
    , body =
        case model.game of
            Loading ->
                [ Html.div [ Css.loading ]
                    [ Html.text "Loading..."
                    , Html.div
                        [ Css.loader ]
                        []
                    ]
                ]

            Failure err ->
                [ Html.div [ Css.failure ]
                    [ Html.text err
                    , Html.br [] []
                    , Html.span []
                        [ Html.text "Please report errors to "
                        , Html.a
                            [ Html.Attributes.href "https://github.com/wolfadex/ball-fall"
                            , Html.Attributes.target "_blank"
                            , Html.Attributes.rel "noopener noreferrer"
                            ]
                            [ Html.text "https://github.com/wolfadex/ball-fall" ]
                        ]
                    ]
                ]

            Loaded game ->
                viewGame model game
    }


viewGame : Model -> LoadedGame -> List (Html Msg)
viewGame model game =
    case game.stage of
        MainMenu ->
            viewMainMenu model

        Playing state ->
            let
                currentScore =
                    game.player
                        |> Physics.frame
                        |> Frame3d.originPoint
                        |> Point3d.zCoordinate
                        |> Length.inMeters
                        |> floor
            in
            [ view3d model game
            , Html.span [ Css.score ]
                [ Html.text ("Score: " ++ String.fromInt currentScore) ]
            , game.remainingTime
                |> Duration.inSeconds
                |> ceiling
                |> String.fromInt
                |> (\z ->
                        Html.span [ Css.timer ]
                            [ Html.text (z ++ "s") ]
                   )
            , case state of
                Falling ->
                    Html.text ""

                Paused ->
                    Html.span
                        [ Css.paused ]
                        [ Html.text "PAUSED"
                        , Html.button
                            [ Html.Events.onClick UserUnpaused ]
                            [ Html.text "Resume" ]
                        , Html.button
                            [ Html.Events.onClick UserOpenedSettings ]
                            [ Html.text "Settings" ]
                        ]

                TimeRanOut ->
                    Html.div [ Css.timeRanOut ]
                        [ Html.text "Time ran out"
                        , case model.bestScore of
                            Nothing ->
                                Html.span [ Css.betterScore ]
                                    [ Html.span [] [ Html.text "New best score: " ]
                                    , Html.text (String.fromInt currentScore)
                                    ]

                            Just bestScore ->
                                if currentScore < bestScore then
                                    Html.span [ Css.betterScore ]
                                        [ Html.span [] [ Html.text "New best score: " ]
                                        , Html.text (String.fromInt currentScore)
                                        ]

                                else
                                    Html.text ""
                        , Html.button
                            [ Html.Events.onClick UserClickedStart ]
                            [ Html.text "Drop-in again" ]
                        ]
            , viewSettings model
            ]


viewMainMenu : Model -> List (Html Msg)
viewMainMenu model =
    [ Html.div
        [ Css.mainMenu ]
        [ Html.h1 [] [ Html.text "Ball Fall" ]
        , Html.h3 []
            [ Html.text "Can you get the lowest score?" ]
        , Html.button
            [ Html.Events.onClick UserClickedStart ]
            [ Html.span [] [ Html.text "Drop-in" ] ]
        , Html.br [] []
        , case model.bestScore of
            Nothing ->
                Html.text ""

            Just bestScore ->
                Html.span [ Css.bestScore ]
                    [ Html.text ("Best score: " ++ String.fromInt bestScore) ]
        , Html.br [] []
        , Html.button
            [ Html.Events.onClick UserOpenedSettings ]
            [ Html.text "Settings" ]
        ]
    , viewSettings model
    ]


viewSettings : Model -> Html Msg
viewSettings model =
    if model.showSettings then
        Html.span
            [ Css.settings ]
            [ Html.text "SETTINGS"
            , Html.label []
                [ Html.input
                    [ Html.Attributes.type_ "checkbox"
                    , Html.Attributes.checked model.musicEnabled
                    , Html.Events.onCheck UserToggledMusicEnabled
                    ]
                    []
                , Html.span []
                    [ Html.text "Music enabled" ]
                ]
            , Html.label []
                [ Html.span [] [ Html.text "Music volume" ]
                , Html.input
                    [ Html.Attributes.type_ "range"
                    , Html.Attributes.min "0"
                    , Html.Attributes.max "1"
                    , Html.Attributes.step "0.1"
                    , Html.Attributes.value (String.fromFloat model.musicVolume)
                    , Html.Events.onInput UserChangedMusicVolume
                    ]
                    []
                ]
            , Html.label []
                [ Html.input
                    [ Html.Attributes.type_ "checkbox"
                    , Html.Attributes.checked model.soundEffectsEnabled
                    , Html.Events.onCheck UserToggledSoundEffectsEnabled
                    ]
                    []
                , Html.span []
                    [ Html.text "SFX enabled" ]
                ]
            , Html.label []
                [ Html.span [] [ Html.text "SFX volume" ]
                , Html.input
                    [ Html.Attributes.type_ "range"
                    , Html.Attributes.min "0"
                    , Html.Attributes.max "1"
                    , Html.Attributes.step "0.1"
                    , Html.Attributes.value (String.fromFloat model.soundEffectsVolume)
                    , Html.Events.onInput UserChangedSoundEffectsVolume
                    ]
                    []
                ]
            , Html.button
                [ Html.Events.onClick UserClosedSettings ]
                [ Html.text "Back" ]
            ]

    else
        Html.text ""


view3d : Model -> LoadedGame -> Html Msg
view3d model game =
    let
        playerPosition =
            game.player
                |> Physics.frame
                |> Frame3d.originPoint

        camera =
            playerPosition
                |> makeCamera

        playerZ =
            Point3d.zCoordinate playerPosition
                |> Length.inMeters

        ( holeFrame, holeHue ) =
            game.currentGoal

        holeColor =
            Color.hsl holeHue 1.0 0.5

        mainLight =
            Scene3d.Light.point (Scene3d.Light.castsShadows True)
                { chromaticity = Scene3d.Light.sunlight
                , intensity = LuminousFlux.lumens 5000
                , position =
                    camera
                        |> Camera3d.eyePoint
                }
    in
    Scene3d.custom
        { lights =
            case game.previousGoals of
                [] ->
                    Scene3d.twoLights
                        mainLight
                        (goalLight game.currentGoal)

                [ one ] ->
                    Scene3d.threeLights
                        mainLight
                        (goalLight game.currentGoal)
                        (prevGoalLight one)

                [ one, two ] ->
                    Scene3d.fourLights
                        mainLight
                        (goalLight game.currentGoal)
                        (prevGoalLight one)
                        (prevGoalLight two)

                [ one, two, three ] ->
                    Scene3d.fiveLights
                        mainLight
                        (goalLight game.currentGoal)
                        (prevGoalLight one)
                        (prevGoalLight two)
                        (prevGoalLightNoShadoow three)

                one :: two :: three :: four :: _ ->
                    Scene3d.sixLights
                        mainLight
                        (goalLight game.currentGoal)
                        (prevGoalLight one)
                        (prevGoalLight two)
                        (prevGoalLightNoShadoow three)
                        (prevGoalLightNoShadoow four)
        , exposure = Scene3d.exposureValue 4
        , toneMapping = Scene3d.hableFilmicToneMapping
        , whiteBalance = Scene3d.Light.daylight
        , antialiasing = Scene3d.noAntialiasing
        , dimensions = ( Pixels.int model.width, Pixels.int model.height )
        , camera = camera
        , clipDepth = Length.millimeters 2
        , background = Scene3d.backgroundColor Color.black
        , entities =
            [ Scene3d.meshWithShadow
                game.assets.ballMaterial
                game.assets.ballMesh
                game.assets.ballShadow
                |> Scene3d.scaleAbout Point3d.origin 0.25
                |> Scene3d.placeIn (Physics.frame game.player)
            , wallPosX
            , wallNegX playerZ
            , wallPosY
            , wallNegY playerZ
            , Scene3d.mesh
                (Scene3d.Material.matte holeColor)
                game.assets.goalRingMesh
                |> Scene3d.scaleAbout Point3d.origin 0.9
                |> Scene3d.placeIn holeFrame
            ]
                ++ List.map (viewGoal game.assets) game.previousGoals
                ++ game.floors
        }


goalLight : ( GoalFrame, Float ) -> Scene3d.Light.Light Physics.WorldCoordinates Bool
goalLight ( frame, hue ) =
    let
        holeColor =
            Color.hsl hue 1.0 0.5
    in
    Scene3d.Light.point (Scene3d.Light.castsShadows False)
        { chromaticity = Scene3d.Light.color holeColor
        , intensity = LuminousFlux.lumens 250
        , position = Frame3d.originPoint frame
        }


prevGoalLight : ( GoalFrame, Float, Duration ) -> Scene3d.Light.Light Physics.WorldCoordinates Bool
prevGoalLight ( frame, hue, life ) =
    let
        holeColor =
            Color.hsl hue 1.0 0.5

        lifeMagnitude =
            Duration.inSeconds life / Duration.inSeconds goalLife
    in
    Scene3d.Light.point (Scene3d.Light.castsShadows False)
        { chromaticity = Scene3d.Light.color holeColor
        , intensity = LuminousFlux.lumens (250 * lifeMagnitude)
        , position = Frame3d.originPoint frame
        }


prevGoalLightNoShadoow : ( GoalFrame, Float, Duration ) -> Scene3d.Light.Light Physics.WorldCoordinates Never
prevGoalLightNoShadoow ( frame, hue, life ) =
    let
        holeColor =
            Color.hsl hue 1.0 0.5

        lifeMagnitude =
            Duration.inSeconds life / Duration.inSeconds goalLife
    in
    Scene3d.Light.point Scene3d.Light.neverCastsShadows
        { chromaticity = Scene3d.Light.color holeColor
        , intensity = LuminousFlux.lumens (250 * lifeMagnitude)
        , position = Frame3d.originPoint frame
        }


viewGimble : Point3d Length.Meters coordinates -> Scene3d.Entity coordinates
viewGimble point =
    Scene3d.group
        [ Scene3d.lineSegment
            (Scene3d.Material.color Color.red)
            (LineSegment3d.from
                point
                (point
                    |> Point3d.translateBy (Vector3d.meters 1 0 0)
                )
            )
        , Scene3d.lineSegment
            (Scene3d.Material.color Color.green)
            (LineSegment3d.from
                point
                (point
                    |> Point3d.translateBy (Vector3d.meters 0 1 0)
                )
            )
        , Scene3d.lineSegment
            (Scene3d.Material.color Color.blue)
            (LineSegment3d.from
                point
                (point
                    |> Point3d.translateBy (Vector3d.meters 0 0 1)
                )
            )
        ]


viewGoal : Assets -> ( GoalFrame, Float, Duration ) -> Scene3d.Entity Physics.WorldCoordinates
viewGoal assets ( frame, hue, life ) =
    let
        holeColor =
            Color.hsl hue 1.0 0.5
    in
    Scene3d.mesh
        (Scene3d.Material.matte holeColor)
        assets.goalRingMesh
        |> Scene3d.scaleAbout Point3d.origin (0.9 * (Duration.inSeconds life / Duration.inSeconds goalLife))
        -- |> Scene3d.scaleAbout Point3d.origin 0.9
        |> Scene3d.placeIn frame


wallPosX : Scene3d.Entity Physics.WorldCoordinates
wallPosX =
    -- Scene3d.quadWithShadow
    --     (Scene3d.Material.matte (Color.rgba 0.3 0.3 1 0.4))
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) 10)
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) 10)
    Scene3d.nothing


wallNegX : Float -> Scene3d.Entity Physics.WorldCoordinates
wallNegX playerZ =
    Scene3d.quadWithShadow
        (Scene3d.Material.matte (Color.rgb 0.8 0.75 0.8))
        (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) (-60 + playerZ))
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) (-60 + playerZ))
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) (10 + playerZ))
        (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) (10 + playerZ))


wallPosY : Scene3d.Entity Physics.WorldCoordinates
wallPosY =
    -- Scene3d.quadWithShadow
    --     (Scene3d.Material.matte (Color.rgba 0.3 0.3 1 0.4))
    --     (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) 10)
    --     (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) 10)
    Scene3d.nothing


wallNegY : Float -> Scene3d.Entity Physics.WorldCoordinates
wallNegY playerZ =
    Scene3d.quadWithShadow
        (Scene3d.Material.matte (Color.rgb 0.75 0.75 0.8))
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) (-60 + playerZ))
        (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) (-60 + playerZ))
        (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) (10 + playerZ))
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) (10 + playerZ))


makeCamera : Point3d Length.Meters Physics.WorldCoordinates -> Camera3d.Camera3d Length.Meters Physics.WorldCoordinates
makeCamera playerPosition =
    let
        pp =
            Point3d.unwrap playerPosition
    in
    Camera3d.lookAt
        { eyePoint = Point3d.unsafe { x = 3, y = 3, z = pp.z + 3 }
        , focalPoint = Point3d.unsafe { x = 0, y = 0, z = pp.z }
        , upDirection = Direction3d.z
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 90)
        }
