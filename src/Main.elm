port module Main exposing (DeviceOrientation, Flags, Game, Id, Model, Msg, Settings, main)

import Angle
import Axis3d
import Block3d exposing (Block3d)
import Browser
import Browser.Dom
import Browser.Events
import Camera3d
import Color
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
import Json.Encode
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
import Process
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
    , savedSettings : Json.Decode.Value
    , bestScore : Json.Decode.Value
    , tiltSupported : Bool
    }


type alias Settings =
    { musicEnabled : Bool
    , musicVolume : Float
    , soundEffectsEnabled : Bool
    , soundEffectsVolume : Float
    , tiltControlsEnabled : Bool
    , ballsUnlocked : List BallSelection
    }


defaultSettings : Settings
defaultSettings =
    { musicEnabled = True
    , musicVolume = 1.0
    , soundEffectsEnabled = True
    , soundEffectsVolume = 1.0
    , tiltControlsEnabled = True
    , ballsUnlocked = defaultBalls
    }


defaultBalls : List BallSelection
defaultBalls =
    [ Ball_Split
    , Ball_Original
    ]


encodeSettings : Model -> Json.Decode.Value
encodeSettings model =
    Json.Encode.object
        [ ( "musicEnabled", Json.Encode.bool model.musicEnabled )
        , ( "musicVolume", Json.Encode.float model.musicVolume )
        , ( "soundEffectsEnabled", Json.Encode.bool model.soundEffectsEnabled )
        , ( "soundEffectsVolume", Json.Encode.float model.soundEffectsVolume )
        , ( "tiltControlsEnabled", Json.Encode.bool model.tiltControlsEnabled )
        , ( "ballsUnlocked", Json.Encode.list encodeBall model.ballsUnlocked )
        ]


decodeSettings : Json.Decode.Decoder Settings
decodeSettings =
    Json.Decode.map6
        (\musicEnabled musicVolume soundEffectsEnabled soundEffectsVolume tiltControlsEnabled ballsUnlocked ->
            { musicEnabled = musicEnabled
            , musicVolume = musicVolume
            , soundEffectsEnabled = soundEffectsEnabled
            , soundEffectsVolume = soundEffectsVolume
            , tiltControlsEnabled = tiltControlsEnabled
            , ballsUnlocked = ballsUnlocked
            }
        )
        (decodeOptional defaultSettings.musicEnabled
            "musicEnabled"
            Json.Decode.bool
        )
        (decodeOptional defaultSettings.musicVolume
            "musicVolume"
            Json.Decode.float
        )
        (decodeOptional defaultSettings.soundEffectsEnabled
            "soundEffectsEnabled"
            Json.Decode.bool
        )
        (decodeOptional defaultSettings.soundEffectsVolume
            "soundEffectsVolume"
            Json.Decode.float
        )
        (decodeOptional defaultSettings.tiltControlsEnabled
            "tiltControlsEnabled"
            Json.Decode.bool
        )
        (decodeOptional defaultSettings.ballsUnlocked
            "ballsUnlocked"
            (Json.Decode.list decodeBall)
        )


decodeOptional : a -> String -> Json.Decode.Decoder a -> Json.Decode.Decoder a
decodeOptional fallback key valDecoder =
    let
        nullOr decoder =
            Json.Decode.oneOf [ decoder, Json.Decode.null fallback ]

        handleResult input =
            case Json.Decode.decodeValue (Json.Decode.field key Json.Decode.value) input of
                Ok rawValue ->
                    -- The field was present, so now let's try to decode that value.
                    -- (If it was present but fails to decode, this should and will fail!)
                    case Json.Decode.decodeValue (nullOr valDecoder) rawValue of
                        Ok finalResult ->
                            Json.Decode.succeed finalResult

                        Err _ ->
                            -- Return a decoder that we know will fail and also give a nice structured error
                            Json.Decode.field key (nullOr valDecoder)

                Err _ ->
                    -- The field was not present, so use the fallback.
                    Json.Decode.succeed fallback
    in
    Json.Decode.value
        |> Json.Decode.andThen handleResult


type Id
    = Ball
    | FloorPiece Int
    | Wall


type alias Model =
    { seed : Random.Seed
    , rawSeed : String
    , userSetSeed : Bool
    , width : Int
    , height : Int
    , game : Game
    , bestScore : Maybe Int
    , deviceOrientationZero : DeviceOrientation
    , deviceOrientation : DeviceOrientation
    , tiltSupported : Bool

    -- Settings
    , showSettings : Bool
    , musicEnabled : Bool
    , musicVolume : Float
    , soundEffectsEnabled : Bool
    , soundEffectsVolume : Float
    , tiltControlsEnabled : Bool
    , ballsUnlocked : List BallSelection
    }


type alias DeviceOrientation =
    { leftRight : Float
    , upDown : Float
    }


type Game
    = Loading
    | Failure String
    | Loaded LoadedGame


type BallSelection
    = Ball_Split
    | Ball_Original
    | Ball_Poke
    | Ball_Banana
    | Ball_Pinball


encodeBall : BallSelection -> Json.Decode.Value
encodeBall ball =
    Json.Encode.string <|
        case ball of
            Ball_Original ->
                "original"

            Ball_Split ->
                "split"

            Ball_Poke ->
                "poke"

            Ball_Banana ->
                "banana"

            Ball_Pinball ->
                "pinball"


decodeBall : Json.Decode.Decoder BallSelection
decodeBall =
    Json.Decode.string
        |> Json.Decode.andThen
            (\ball ->
                case ball of
                    "original" ->
                        Json.Decode.succeed Ball_Original

                    "split" ->
                        Json.Decode.succeed Ball_Split

                    "poke" ->
                        Json.Decode.succeed Ball_Poke

                    "banana" ->
                        Json.Decode.succeed Ball_Banana

                    "pinball" ->
                        Json.Decode.succeed Ball_Pinball

                    _ ->
                        Json.Decode.fail "Unknown ball"
            )


allBalls : List BallSelection
allBalls =
    [ Ball_Split
    , Ball_Original
    , Ball_Poke
    , Ball_Banana
    , Ball_Pinball
    ]


type alias LoadedGame =
    { player : Physics.Body
    , bodies : List ( Id, Physics.Body )
    , contacts : Physics.Contacts Id
    , timestep : Timestep
    , floors : List (Scene3d.Entity Physics.WorldCoordinates)
    , floorCount : Int
    , keysDown : Set String
    , assets : Assets
    , currentGoal : ( PointFrame, Float )
    , upcomingGoals : List PointFrame
    , previousGoals : List ( PointFrame, Float, Duration )
    , remainingTime : Duration
    , stage : Stage
    , ballSelection : BallSelection
    , ballPickup : Maybe ( PointFrame, ( Float, Bool ) )
    }


type Stage
    = MainMenu
    | Playing PlayState


type PlayState
    = Falling
    | Paused
    | TimeRanOut


type alias PointFrame =
    Frame3d Length.Meters Physics.WorldCoordinates { defines : Physics.BodyCoordinates }


type alias Assets =
    { ballOriginal : BallAssets
    , ballSplitMiddle : BallAssets
    , ballPoke : BallAssets
    , ballBanana : ( BallAssets, BallAssets )

    --
    , pickupMysteryMesh : Scene3d.Mesh.Textured Physics.BodyCoordinates
    , pickupMysteryShadow : Scene3d.Mesh.Shadow Physics.BodyCoordinates
    , goalRingMesh : Scene3d.Mesh.Textured Physics.BodyCoordinates
    }


type alias BallAssets =
    { mesh : Scene3d.Mesh.Textured Physics.BodyCoordinates
    , shadow : Scene3d.Mesh.Shadow Physics.BodyCoordinates
    , material : Scene3d.Material.Textured Physics.BodyCoordinates
    }


init : Flags -> ( Model, Cmd Msg )
init { initialSeed, width, height, savedSettings, bestScore, tiltSupported } =
    let
        settings =
            case Json.Decode.decodeValue decodeSettings savedSettings of
                Err _ ->
                    defaultSettings

                Ok saved ->
                    saved
    in
    ( { seed = Random.initialSeed initialSeed
      , rawSeed = String.fromInt initialSeed
      , userSetSeed = False
      , width = width
      , height = height
      , game = Loading
      , deviceOrientationZero = { leftRight = 0, upDown = 0 }
      , deviceOrientation = { leftRight = 0, upDown = 0 }
      , tiltSupported = tiltSupported
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

      -- Settings
      , showSettings = False
      , musicEnabled = settings.musicEnabled
      , soundEffectsEnabled = settings.soundEffectsEnabled
      , musicVolume = settings.musicVolume
      , soundEffectsVolume = settings.soundEffectsVolume
      , tiltControlsEnabled = settings.tiltControlsEnabled
      , ballsUnlocked = settings.ballsUnlocked
      }
    , Task.map3 (\a b c -> ( a, b, c ))
        getBalls
        (getMesh "pickup_mystery")
        (getMesh "goal_ring")
        |> Task.attempt AssetsLoaded
    )


getBalls :
    Task
        String
        { ballOriginal : BallAssets
        , ballSplitMiddle : BallAssets
        , ballPoke : BallAssets
        , ballBanana : ( BallAssets, BallAssets )
        }
getBalls =
    Task.map4
        (\ballOriginal ballSplitMiddle ballPoke ballBanana ->
            { ballOriginal = ballOriginal
            , ballSplitMiddle = ballSplitMiddle
            , ballPoke = ballPoke
            , ballBanana = ballBanana
            }
        )
        (getBall "ball")
        (getBall "ball_split_middle")
        (getBall "ball_poke")
        getBallBanana


getBall : String -> Task String BallAssets
getBall name =
    Task.map2
        (\mesh texture ->
            { mesh = mesh
            , shadow = Scene3d.Mesh.shadow mesh
            , material = Scene3d.Material.texturedMatte texture
            }
        )
        (getMesh name)
        (Scene3d.Material.load ("assets/" ++ name ++ ".png")
            |> Task.mapError (\_ -> "Failed to load texture")
        )


getBallBanana : Task String ( BallAssets, BallAssets )
getBallBanana =
    Task.map4
        (\meshOuter textureOuter meshInner textureInner ->
            ( { mesh = meshOuter
              , shadow = Scene3d.Mesh.shadow meshOuter
              , material = Scene3d.Material.texturedMatte textureOuter
              }
            , { mesh = meshInner
              , shadow = Scene3d.Mesh.shadow meshInner
              , material = Scene3d.Material.texturedMatte textureInner
              }
            )
        )
        (getMesh "ball_banana_outer")
        (Scene3d.Material.load "assets/ball_banana_outer.png"
            |> Task.mapError (\_ -> "Failed to load texture")
        )
        (getMesh "ball_banana_inner")
        (Scene3d.Material.load "assets/ball_banana_inner.png"
            |> Task.mapError (\_ -> "Failed to load texture")
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
        , deviceOrientationEvent DeviceOrientationChanged
        ]


port deviceOrientationEvent : (Json.Decode.Value -> msg) -> Sub msg


port playSound : { sound : String, volume : Float } -> Cmd msg


port startMusic : { track : String, volume : Float } -> Cmd msg


port musicVolumeSet : Float -> Cmd msg


port stopMusic : String -> Cmd msg


port resumeMusic : String -> Cmd msg


port saveSettings : Json.Decode.Value -> Cmd msg


port saveScore : Int -> Cmd msg


port copySeed : String -> Cmd msg


type Msg
    = AssetsLoaded
        (Result
            String
            ( { ballOriginal : BallAssets
              , ballSplitMiddle : BallAssets
              , ballPoke : BallAssets
              , ballBanana : ( BallAssets, BallAssets )
              }
            , Scene3d.Mesh.Textured Physics.BodyCoordinates
            , Scene3d.Mesh.Textured Physics.BodyCoordinates
            )
        )
    | BrowserResized Int Int
    | BrowserVisibilityChanged Browser.Events.Visibility
    | UserClickedStart
    | UserSelectedPreviousBall
    | UserSelectedNextBall
      --
    | UserPaused
    | UserUnpaused
      --
    | UserOpenedSettings
    | UserClosedSettings
    | UserResetTiltAngle
    | UserChangedRawSeed String
    | UserToggledMusicEnabled Bool
    | UserChangedMusicVolume String
    | UserToggledSoundEffectsEnabled Bool
    | UserChangedSoundEffectsVolume String
    | UserToggledTiltControlsEnabled Bool
    | UserCopiedSeed
    | UserUnlockedAllSkins
    | UserResetSkinUnlocks
      --
    | FocusElement (Result Browser.Dom.Error ())
      --
    | Tick Duration
    | KeyDown String
    | KeyUp String
    | DeviceOrientationChanged Json.Decode.Value


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FocusElement _ ->
            ( model, Cmd.none )

        BrowserResized width height ->
            ( { model | width = width, height = height }, Cmd.none )

        AssetsLoaded (Err err) ->
            case model.game of
                Loading ->
                    ( { model | game = Failure err }, Cmd.none )

                _ ->
                    ( model, Cmd.none )

        AssetsLoaded (Ok ( { ballOriginal, ballSplitMiddle, ballPoke, ballBanana }, pickupMysteryMesh, goalRingMesh )) ->
            case model.game of
                Loading ->
                    let
                        assets =
                            { ballOriginal = ballOriginal
                            , ballSplitMiddle = ballSplitMiddle
                            , ballBanana = ballBanana
                            , ballPoke = ballPoke
                            , pickupMysteryMesh = pickupMysteryMesh
                            , pickupMysteryShadow = Scene3d.Mesh.shadow pickupMysteryMesh
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
                                , ballSelection = Ball_Split
                                , ballPickup = Nothing
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
                            ( { model
                                | game =
                                    Loaded
                                        { game
                                            | ballPickup = animateBallPickup delta game.ballPickup
                                        }
                              }
                            , Cmd.none
                            )

                        Playing Paused ->
                            ( { model
                                | game =
                                    Loaded
                                        { game
                                            | ballPickup = animateBallPickup delta game.ballPickup
                                        }
                              }
                            , Cmd.none
                            )

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
                                    | game =
                                        Loaded
                                            { game
                                                | stage = Playing TimeRanOut
                                                , ballPickup = animateBallPickup delta game.ballPickup
                                            }
                                  }
                                , Cmd.batch
                                    [ Process.sleep 0
                                        |> Task.andThen (\() -> Browser.Dom.focus "drop-in-again")
                                        |> Task.attempt FocusElement
                                    , case model.bestScore of
                                        Nothing ->
                                            saveScore currentScore

                                        Just bestScore ->
                                            if currentScore < bestScore then
                                                saveScore currentScore

                                            else
                                                Cmd.none
                                    ]
                                )

                            else
                                let
                                    ( nextGame, nextModel, goalMade ) =
                                        updateFloors delta
                                            (Timestep.advance (simulateStep model.tiltControlsEnabled model.deviceOrientationZero model.deviceOrientation) delta game)
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

        UserPaused ->
            case model.game of
                Loaded game ->
                    case game.stage of
                        Playing Falling ->
                            ( { model | game = Loaded { game | stage = Playing Paused } }
                            , playSound
                                { sound = "menu_select"
                                , volume = 0.15
                                }
                            )

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
            case String.toInt model.rawSeed of
                Nothing ->
                    ( model, Cmd.none )

                Just seed ->
                    ( { model
                        | showSettings = False
                        , seed = Random.initialSeed seed
                      }
                    , saveSettings
                        (encodeSettings model)
                    )

        UserResetTiltAngle ->
            ( { model | deviceOrientationZero = model.deviceOrientation }, Cmd.none )

        UserToggledMusicEnabled enabled ->
            ( { model | musicEnabled = enabled }
            , if enabled then
                resumeMusic "song_2"

              else
                stopMusic "song_2"
            )

        UserToggledSoundEffectsEnabled enabled ->
            ( { model | soundEffectsEnabled = enabled }, Cmd.none )

        UserToggledTiltControlsEnabled enabled ->
            ( { model | tiltControlsEnabled = enabled }, Cmd.none )

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

        UserChangedRawSeed rawSeed ->
            ( { model
                | rawSeed = rawSeed
                , userSetSeed = True
              }
            , Cmd.none
            )

        UserCopiedSeed ->
            ( model
            , copySeed model.rawSeed
            )

        UserUnlockedAllSkins ->
            ( { model | ballsUnlocked = allBalls }, Cmd.none )

        UserResetSkinUnlocks ->
            ( { model
                | ballsUnlocked = defaultBalls
                , game =
                    case model.game of
                        Loaded game ->
                            Loaded
                                { game
                                    | ballSelection = Ball_Split
                                }

                        _ ->
                            model.game
              }
            , Cmd.none
            )

        UserSelectedPreviousBall ->
            case model.game of
                Loaded game ->
                    ( { model
                        | game =
                            Loaded
                                { game
                                    | ballSelection = previousInList game.ballSelection model.ballsUnlocked
                                }
                      }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        UserSelectedNextBall ->
            case model.game of
                Loaded game ->
                    ( { model
                        | game =
                            Loaded
                                { game
                                    | ballSelection = nextInList game.ballSelection model.ballsUnlocked
                                }
                      }
                    , Cmd.none
                    )

                _ ->
                    ( model, Cmd.none )

        DeviceOrientationChanged orientation ->
            case
                Json.Decode.decodeValue
                    (Json.Decode.map3
                        (\pitch _ roll ->
                            { leftRight = roll
                            , upDown = pitch
                            }
                        )
                        (Json.Decode.field "pitch" Json.Decode.float)
                        (Json.Decode.field "yaw" Json.Decode.float)
                        (Json.Decode.field "roll" Json.Decode.float)
                    )
                    orientation
            of
                Err _ ->
                    ( model, Cmd.none )

                Ok deviceOrientation ->
                    ( { model | deviceOrientation = deviceOrientation }, Cmd.none )

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


animateBallPickup : Duration -> Maybe ( PointFrame, ( Float, Bool ) ) -> Maybe ( PointFrame, ( Float, Bool ) )
animateBallPickup delta ballPickup =
    case ballPickup of
        Nothing ->
            ballPickup

        Just ( frame, t ) ->
            let
                deltaS =
                    Duration.inSeconds delta
            in
            Just
                ( frame
                , lerpOneNegativeOne deltaS t
                )


lerpOneNegativeOne : Float -> ( Float, Bool ) -> ( Float, Bool )
lerpOneNegativeOne delta ( f, increasing ) =
    if increasing then
        let
            nextF =
                f + delta
        in
        if nextF > 1 then
            ( 1 - (nextF - 1), False )

        else
            ( nextF, increasing )

    else
        let
            nextF =
                f - delta
        in
        if nextF < -1 then
            ( -1 + (nextF + 1), True )

        else
            ( nextF, increasing )


nextInList : a -> List a -> a
nextInList current list =
    nextInListHelper current (list ++ list)


nextInListHelper : a -> List a -> a
nextInListHelper current list =
    case list of
        [] ->
            current

        [ _ ] ->
            current

        next :: after :: rest ->
            if current == next then
                after

            else
                nextInListHelper current (after :: rest)


previousInList : a -> List a -> a
previousInList current list =
    let
        reverseList =
            List.reverse list
    in
    nextInListHelper current (reverseList ++ reverseList)


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

        ( nextSeed, _ ) =
            Random.step
                (Random.int Random.minInt Random.maxInt)
                model.seed

        ( seed, rawSeed, isUserSeed ) =
            if model.userSetSeed then
                case String.toInt model.rawSeed of
                    Nothing ->
                        ( Random.initialSeed nextSeed, String.fromInt nextSeed, False )

                    Just userSeed ->
                        ( Random.initialSeed userSeed, model.rawSeed, True )

            else
                ( Random.initialSeed nextSeed, String.fromInt nextSeed, False )

        ballPickup =
            if isUserSeed then
                Nothing

            else if List.length allBalls == List.length model.ballsUnlocked then
                Nothing

            else
                Random.step
                    (Random.map
                        (\( x, y ) ->
                            Just
                                ( Point3d.meters (toFloat x) (toFloat y) 0.25
                                    |> Frame3d.atPoint
                                , ( 1, False )
                                )
                        )
                        nextHole
                    )
                    seed
                    |> Tuple.first
    in
    ( { model
        | deviceOrientationZero = model.deviceOrientation
        , seed = seed
        , rawSeed = rawSeed
        , userSetSeed = False
        , game =
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
                , ballSelection = game.ballSelection
                , ballPickup = ballPickup
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
                    , ballPickup = animateBallPickup delta game.ballPickup
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
                        , ballPickup = animateBallPickup delta game.ballPickup
                    }
          }
        , False
        )


goalLife : Duration
goalLife =
    Duration.seconds 0.5


animateGoals : Duration -> ( PointFrame, Float, Duration ) -> Maybe ( PointFrame, Float, Duration )
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


simulateStep : Bool -> DeviceOrientation -> DeviceOrientation -> LoadedGame -> LoadedGame
simulateStep tiltControlsEnabled deviceOrientationZero deviceOrientation game =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | contacts = game.contacts
                    , duration = Timestep.duration game.timestep
                }
                (( Ball, updatePlayerBall tiltControlsEnabled deviceOrientationZero deviceOrientation game.keysDown game.player )
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


updatePlayerBall : Bool -> DeviceOrientation -> DeviceOrientation -> Set String -> Physics.Body -> Physics.Body
updatePlayerBall tiltControlsEnabled deviceOrientationZero deviceOrientation keysDown body =
    if tiltControlsEnabled && (deviceOrientation.upDown /= deviceOrientationZero.upDown || deviceOrientation.leftRight /= deviceOrientationZero.leftRight) then
        let
            cameraFrame =
                Physics.frame body
                    |> Frame3d.originPoint
                    |> makeCamera
                    |> Camera3d.frame

            -- use ranges of 20 (up) to 40 (down)
            ( verticalParts, verticalMagintude ) =
                if deviceOrientation.upDown < deviceOrientationZero.upDown then
                    ( cameraFrame
                        |> Frame3d.xDirection
                        |> Direction3d.unwrap
                        |> (\p -> { x = -p.x, y = -p.y, z = 0 })
                    , max 20 (abs (deviceOrientationZero.upDown - deviceOrientation.upDown)) / 20
                    )

                else if deviceOrientation.upDown > deviceOrientationZero.upDown then
                    ( cameraFrame
                        |> Frame3d.xDirection
                        |> Direction3d.unwrap
                    , max 20 (abs (deviceOrientation.upDown - deviceOrientationZero.upDown)) / 20
                    )

                else
                    ( { x = 0, y = 0, z = 0 }, 0 )

            -- use ranges of -30 (left) to 30 (right)
            ( horizontalParts, horizontalMagnitude ) =
                if deviceOrientation.leftRight < deviceOrientationZero.leftRight then
                    ( cameraFrame
                        |> Frame3d.yDirection
                        |> Direction3d.unwrap
                        |> (\p -> { x = -p.x, y = -p.y, z = 0 })
                    , max 30 (abs (deviceOrientationZero.leftRight - deviceOrientation.leftRight)) / 30
                    )

                else if deviceOrientation.leftRight > deviceOrientationZero.leftRight then
                    ( cameraFrame
                        |> Frame3d.yDirection
                        |> Direction3d.unwrap
                    , max 30 (abs (deviceOrientation.leftRight - deviceOrientationZero.leftRight)) / 30
                    )

                else
                    ( { x = 0, y = 0, z = 0 }, 0 )
        in
        Physics.applyTorque
            (Vector3d.withLength
                (Torque.newtonMeters (75 * min 1 (verticalMagintude + horizontalMagnitude)))
                (Direction3d.unsafe
                    { x = verticalParts.x + horizontalParts.x
                    , y = verticalParts.y + horizontalParts.y
                    , z = 0
                    }
                )
            )
            body

    else
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
            viewMainMenu model game

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
                    Html.button
                        [ Css.iconButton
                        , Css.pauseButton
                        , Html.Attributes.title "Pause"
                        , Html.Events.onClick UserPaused
                        ]
                        [ Html.text "⏸" ]

                _ ->
                    Html.text ""
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
                            [ Html.Events.onClick UserClickedStart
                            , Html.Attributes.id "drop-in-again"
                            ]
                            [ Html.text "Drop-in again" ]
                        , Html.button
                            [ Html.Events.onClick UserOpenedSettings ]
                            [ Html.text "Settings" ]
                        ]
            , viewSettings model
            ]


viewMainMenu : Model -> LoadedGame -> List (Html Msg)
viewMainMenu model game =
    [ Html.div
        [ Css.mainMenu ]
        [ Html.h1 [] [ Html.text "Ball Fall" ]
        , Html.h3 []
            [ Html.text "Can you get the lowest score?" ]
        , Html.button
            [ Html.Events.onClick UserClickedStart ]
            [ Html.span [] [ Html.text "Drop-in" ] ]
        , viewBallSelection game
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


viewBallSelection : LoadedGame -> Html Msg
viewBallSelection game =
    Html.div [ Css.ballSelection ]
        [ Html.button
            [ Html.Events.onClick UserSelectedPreviousBall
            ]
            [ Html.text "◀" ]
        , Scene3d.custom
            { lights =
                Scene3d.twoLights
                    (Scene3d.Light.point (Scene3d.Light.castsShadows True)
                        { chromaticity = Scene3d.Light.sunlight
                        , intensity = LuminousFlux.lumens 5000
                        , position = Point3d.meters 2 3 3
                        }
                    )
                    (goalLight ( Frame3d.atPoint (Point3d.meters 0 0 -4), 0 ))
            , exposure = Scene3d.exposureValue 4
            , toneMapping = Scene3d.hableFilmicToneMapping
            , whiteBalance = Scene3d.Light.daylight
            , antialiasing = Scene3d.noAntialiasing
            , dimensions = ( Pixels.int 80, Pixels.int 80 )
            , camera =
                Camera3d.lookAt
                    { eyePoint = Point3d.meters 2 3 3
                    , focalPoint = Point3d.unsafe { x = 0, y = 0, z = 0 }
                    , upDirection = Direction3d.z
                    , projection = Camera3d.Perspective
                    , fov = Camera3d.angle (Angle.degrees 30)
                    }
            , clipDepth = Length.millimeters 2
            , background = Scene3d.backgroundColor Color.black
            , entities =
                [ viewBall game.assets game.ballSelection
                    |> Scene3d.scaleAbout Point3d.origin 1.25
                    |> Scene3d.placeIn Frame3d.atOrigin
                ]
            }
        , Html.button
            [ Html.Events.onClick UserSelectedNextBall
            ]
            [ Html.text "▶" ]
        ]


viewBall : Assets -> BallSelection -> Scene3d.Entity Physics.BodyCoordinates
viewBall assets selection =
    case selection of
        Ball_Original ->
            Scene3d.meshWithShadow
                assets.ballOriginal.material
                assets.ballOriginal.mesh
                assets.ballOriginal.shadow

        Ball_Split ->
            Scene3d.meshWithShadow
                assets.ballSplitMiddle.material
                assets.ballSplitMiddle.mesh
                assets.ballSplitMiddle.shadow

        Ball_Poke ->
            Scene3d.meshWithShadow
                assets.ballPoke.material
                assets.ballPoke.mesh
                assets.ballPoke.shadow

        Ball_Banana ->
            let
                ( _, inner ) =
                    assets.ballBanana
            in
            Scene3d.group
                [ Scene3d.meshWithShadow
                    inner.material
                    inner.mesh
                    inner.shadow

                -- , Scene3d.meshWithShadow
                --     outer.material
                --     outer.mesh
                --     outer.shadow
                , Scene3d.sphereWithShadow
                    (Scene3d.Material.matte (Color.rgba 1 1 1 0.5))
                    (Sphere3d.atOrigin
                        (Length.meters 1)
                    )
                ]

        Ball_Pinball ->
            Scene3d.sphereWithShadow
                (Scene3d.Material.metal
                    { baseColor = Color.rgb 1 1 1
                    , roughness = 0.4
                    }
                )
                (Sphere3d.atOrigin
                    (Length.meters 1)
                )


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
            , Html.label []
                [ Html.input
                    [ Html.Attributes.type_ "checkbox"
                    , Html.Attributes.checked model.tiltControlsEnabled
                    , Html.Events.onCheck UserToggledTiltControlsEnabled
                    , Html.Attributes.disabled (not model.tiltSupported)
                    ]
                    []
                , Html.span []
                    [ Html.text "Tilt controls enabled" ]
                ]
            , Html.button
                [ Html.Events.onClick UserResetTiltAngle ]
                [ Html.text "Reset tilt angle" ]
            , Html.label []
                [ Html.span [] [ Html.text "Seed" ]
                , Html.input
                    [ Html.Attributes.type_ "text"
                    , Html.Attributes.value model.rawSeed
                    , Html.Events.onInput UserChangedRawSeed
                    , Html.Attributes.readonly <|
                        case model.game of
                            Loaded game ->
                                case game.stage of
                                    MainMenu ->
                                        False

                                    Playing Falling ->
                                        True

                                    Playing Paused ->
                                        True

                                    Playing TimeRanOut ->
                                        False

                            _ ->
                                False
                    ]
                    []
                , Html.button
                    [ Css.iconButton
                    , Html.Attributes.title "Copy seed to clipboard"
                    , Html.Events.onClick UserCopiedSeed
                    ]
                    [ Html.text "⎘" ]
                ]
            , Html.span [ Css.error ]
                [ Html.text <|
                    case String.toInt model.rawSeed of
                        Nothing ->
                            "Seed must be a whole number"

                        Just _ ->
                            ""
                ]
            , Html.button
                [ Html.Events.onClick UserUnlockedAllSkins ]
                [ Html.text "Unlock all skins" ]
            , Html.button
                [ Html.Events.onClick UserResetSkinUnlocks ]
                [ Html.text "Reset to default skins" ]
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
            [ viewBall game.assets game.ballSelection
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
            , case game.ballPickup of
                Nothing ->
                    Scene3d.nothing

                Just ( frame, ( t, _ ) ) ->
                    Scene3d.meshWithShadow
                        (Scene3d.Material.matte Color.red)
                        game.assets.pickupMysteryMesh
                        game.assets.pickupMysteryShadow
                        |> Scene3d.rotateAround Axis3d.x (Angle.degrees (20 * sin t))
                        |> Scene3d.rotateAround Axis3d.y (Angle.degrees (20 * cos t))
                        |> Scene3d.placeIn
                            (frame
                                |> Frame3d.rotateAroundOwn Frame3d.zAxis
                                    (Angle.degrees -30)
                                |> Frame3d.rotateAroundOwn Frame3d.xAxis
                                    (Angle.degrees 30)
                            )
            ]
                ++ List.map (viewGoal game.assets) game.previousGoals
                ++ game.floors
        }


goalLight : ( PointFrame, Float ) -> Scene3d.Light.Light Physics.WorldCoordinates Bool
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


prevGoalLight : ( PointFrame, Float, Duration ) -> Scene3d.Light.Light Physics.WorldCoordinates Bool
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


prevGoalLightNoShadoow : ( PointFrame, Float, Duration ) -> Scene3d.Light.Light Physics.WorldCoordinates Never
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


viewGoal : Assets -> ( PointFrame, Float, Duration ) -> Scene3d.Entity Physics.WorldCoordinates
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
