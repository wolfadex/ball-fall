port module Main exposing (Id, Model, Msg, main)

import Angle
import Array
import Block3d exposing (Block3d)
import Browser
import Browser.Events
import Camera3d
import Color
import Css
import Direction3d
import Duration exposing (Duration)
import Frame3d
import Html exposing (Html)
import Json.Decode
import Length
import Physics exposing (onEarth)
import Physics.Material
import Physics.Shape
import Pixels
import Plane3d
import Point3d exposing (Point3d)
import Quantity
import Random
import Scene3d
import Scene3d.Material
import Scene3d.Mesh
import Set exposing (Set)
import Sphere3d exposing (Sphere3d)
import Timestep exposing (Timestep)
import Torque
import TriangularMesh exposing (TriangularMesh)
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
    }


type Id
    = Ball
    | FloorPiece Int
    | Wall Side


type Side
    = PosX
    | PosY
    | NegX
    | NegY


type alias Model =
    { player : Physics.Body
    , bodies : List ( Id, Physics.Body )
    , contacts : Physics.Contacts Id
    , timestep : Timestep
    , floors : List ( Scene3d.Mesh.Uniform Physics.BodyCoordinates, Scene3d.Mesh.Shadow Physics.BodyCoordinates )
    , seed : Random.Seed
    , width : Int
    , height : Int
    , floorCount : Int
    , keysDown : Set String
    }


init : Flags -> ( Model, Cmd Msg )
init { initialSeed, width, height } =
    let
        fl1 =
            nextFloor 0 (Random.initialSeed initialSeed)

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
    ( { player =
            Physics.sphere
                playerSphere
                Physics.Material.wood
                |> Physics.translateBy (Vector3d.meters 0 0 2)
                |> Physics.damp
                    { linear = 0.01
                    , angular = 0.5
                    }
      , bodies =
            [ ( Wall PosX
              , Physics.plane
                    (Plane3d.yz
                        |> Plane3d.flip
                        |> Plane3d.translateBy (Vector3d.meters maxExtent 0 0)
                    )
                    Physics.Material.wood
              )
            , ( Wall NegX
              , Physics.plane
                    (Plane3d.yz
                        |> Plane3d.translateBy (Vector3d.meters -maxExtent 0 0)
                    )
                    Physics.Material.wood
              )
            , ( Wall PosY
              , Physics.plane
                    (Plane3d.zx
                        |> Plane3d.flip
                        |> Plane3d.translateBy (Vector3d.meters 0 maxExtent 0)
                    )
                    Physics.Material.wood
              )
            , ( Wall NegY
              , Physics.plane
                    (Plane3d.zx
                        |> Plane3d.translateBy (Vector3d.meters 0 -maxExtent 0)
                    )
                    Physics.Material.wood
              )
            ]
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
            [ fl1.mesh
            , fl2.mesh
            , fl3.mesh
            , fl4.mesh
            , fl5.mesh
            , fl6.mesh
            , fl7.mesh
            , fl8.mesh
            ]
      , floorCount = fl8.floorCount
      , seed = fl8.seed
      , width = width
      , height = height
      , keysDown = Set.empty
      }
    , Cmd.none
    )


nextFloor :
    Int
    -> Random.Seed
    ->
        { mesh : ( Scene3d.Mesh.Uniform Physics.BodyCoordinates, Scene3d.Mesh.Shadow Physics.BodyCoordinates )
        , bodies : List ( Id, Physics.Body )
        , floorCount : Int
        , seed : Random.Seed
        }
nextFloor floorCount seed =
    let
        ( hole, nextSeed ) =
            Random.step nextHole seed

        floor =
            generateFloor (toFloat floorCount * floorSpacing) hole

        floorTris =
            floorToTris floor
    in
    { mesh = floorTrisToMesh floorTris
    , bodies = List.map (floorTrisToBody floorCount) floorTris
    , floorCount = floorCount + 1
    , seed = nextSeed
    }


floorSpacing : Float
floorSpacing =
    -3


floorTrisToMesh : List (TriangularMesh Vert) -> ( Scene3d.Mesh.Uniform Physics.BodyCoordinates, Scene3d.Mesh.Shadow Physics.BodyCoordinates )
floorTrisToMesh tris =
    let
        mesh =
            tris
                |> TriangularMesh.combine
                |> Scene3d.Mesh.indexedFacets
                |> Scene3d.Mesh.cullBackFaces
    in
    ( mesh
    , Scene3d.Mesh.shadow mesh
    )


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


type alias Vert =
    Point3d Length.Meters Physics.BodyCoordinates


type alias Floor =
    { leftOfHole : List Vert
    , rightOfHole : List Vert
    , forwardOfHole : List Vert
    , backwardOfHole : List Vert
    }


floorTrisToBody : Int -> TriangularMesh Vert -> ( Id, Physics.Body )
floorTrisToBody floorNumber floorMesh =
    ( FloorPiece floorNumber
    , Physics.static
        [ ( Physics.Shape.unsafeConvex
                floorMesh
          , Physics.Material.wood
          )
        ]
    )


floorToTris : Floor -> List (TriangularMesh Vert)
floorToTris floor =
    List.map
        (\verts ->
            TriangularMesh.indexed
                (Array.fromList (verts ++ List.map (Point3d.translateBy (Vector3d.meters 0 0 -0.3)) verts))
                [ ( 0, 1, 2 )
                , ( 0, 2, 3 )
                , ( 4, 5, 1 )
                , ( 4, 1, 0 )
                , ( 7, 4, 0 )
                , ( 7, 0, 3 )
                , ( 5, 6, 2 )
                , ( 5, 2, 1 )
                , ( 6, 7, 3 )
                , ( 6, 3, 2 )
                , ( 7, 6, 5 )
                , ( 7, 5, 4 )
                ]
        )
        [ floor.leftOfHole
        , floor.rightOfHole
        , floor.forwardOfHole
        , floor.backwardOfHole
        ]


generateFloor : Float -> ( Int, Int ) -> Floor
generateFloor zOffset ( holeX, holeY ) =
    { leftOfHole =
        if holeY < intExtent then
            [ Point3d.meters -maxExtent maxExtent zOffset
            , Point3d.meters -maxExtent (toFloat holeY + 0.5) zOffset
            , Point3d.meters maxExtent (toFloat holeY + 0.5) zOffset
            , Point3d.meters maxExtent maxExtent zOffset
            ]

        else
            []
    , rightOfHole =
        if holeY > -intExtent then
            [ Point3d.meters -maxExtent (toFloat holeY - 0.5) zOffset
            , Point3d.meters -maxExtent -maxExtent zOffset
            , Point3d.meters maxExtent -maxExtent zOffset
            , Point3d.meters maxExtent (toFloat holeY - 0.5) zOffset
            ]

        else
            []
    , forwardOfHole =
        if holeX < intExtent then
            [ Point3d.meters (toFloat holeX + 0.5) (toFloat holeY + 0.5) zOffset
            , Point3d.meters (toFloat holeX + 0.5) (toFloat holeY + -0.5) zOffset
            , Point3d.meters maxExtent (toFloat holeY + -0.5) zOffset
            , Point3d.meters maxExtent (toFloat holeY + 0.5) zOffset
            ]

        else
            []
    , backwardOfHole =
        if holeX > -intExtent then
            [ Point3d.meters -maxExtent (toFloat holeY + 0.5) zOffset
            , Point3d.meters -maxExtent (toFloat holeY + -0.5) zOffset
            , Point3d.meters (toFloat holeX - 0.5) (toFloat holeY + -0.5) zOffset
            , Point3d.meters (toFloat holeX - 0.5) (toFloat holeY + 0.5) zOffset
            ]

        else
            []
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
        ]


port playSound : { sound : String } -> Cmd msg


type Msg
    = Tick Duration
    | KeyDown String
    | KeyUp String
    | BrowserResized Int Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        BrowserResized width height ->
            ( { model | width = width, height = height }, Cmd.none )

        Tick delta ->
            let
                nextModel =
                    Timestep.advance simulateStep delta model
                        |> updateFloors

                sounds =
                    nextModel.contacts
                        |> Physics.contactPoints (\id1 id2 -> id1 == Ball || id2 == Ball)
                        |> List.foldl
                            (\( id1, id2, contacts ) ->
                                (++)
                                    (List.filterMap
                                        (\{ impulse } ->
                                            if Quantity.unwrap impulse > 12 then
                                                Just (playSound { sound = "wood_hit" })

                                            else
                                                Nothing
                                        )
                                        contacts
                                    )
                            )
                            []
            in
            ( nextModel
            , sounds
                |> Cmd.batch
            )

        KeyDown key ->
            ( { model | keysDown = Set.insert key model.keysDown }, Cmd.none )

        KeyUp key ->
            ( { model | keysDown = Set.remove key model.keysDown }, Cmd.none )


maxFloors : Int
maxFloors =
    8


updateFloors : Model -> Model
updateFloors model =
    if Length.inMeters (Point3d.zCoordinate (Frame3d.originPoint (Physics.frame model.player))) < (toFloat (model.floorCount - maxFloors) * floorSpacing) then
        let
            newFloor =
                nextFloor model.floorCount model.seed
        in
        { model
            | seed = newFloor.seed
            , floorCount = newFloor.floorCount
            , floors =
                case model.floors of
                    [] ->
                        model.floors

                    _ :: restFloors ->
                        restFloors ++ [ newFloor.mesh ]
            , bodies =
                newFloor.bodies
                    ++ List.filter
                        (\( id, _ ) ->
                            case id of
                                FloorPiece height ->
                                    height > (model.floorCount - maxFloors)

                                _ ->
                                    True
                        )
                        model.bodies
        }

    else
        model


simulateStep : Model -> Model
simulateStep model =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | contacts = model.contacts
                    , duration = Timestep.duration model.timestep
                }
                (( Ball, updatePlayerBall model.keysDown model.player )
                    :: model.bodies
                )

        ( player, bodies ) =
            extractPlayer model.player newBodies
    in
    { model
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
                    |> camera
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
        [ view3d model
        , model.player
            |> Physics.frame
            |> Frame3d.originPoint
            |> Point3d.zCoordinate
            |> Length.inMeters
            |> floor
            |> String.fromInt
            |> (\z ->
                    Html.span [ Css.score ]
                        [ Html.text ("Score: " ++ z) ]
               )
        ]
    }


view3d : Model -> Html Msg
view3d model =
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection =
            Direction3d.negativeZ
                |> Direction3d.rotateAround Direction3d.x
                    (Angle.degrees -60)
                |> Direction3d.rotateAround Direction3d.z
                    (Angle.degrees -45)
        , shadows = True
        , dimensions = ( Pixels.int model.width, Pixels.int model.height )
        , camera =
            model.player
                |> Physics.frame
                |> Frame3d.originPoint
                |> camera
        , clipDepth = Length.millimeters 2
        , background = Scene3d.backgroundColor Color.black
        , entities =
            [ Scene3d.sphereWithShadow
                (Scene3d.Material.matte Color.green)
                (Sphere3d.placeIn (Physics.frame model.player)
                    playerSphere
                )
            , wallPosX
            , wallNegX
            , wallPosY
            , wallNegY
            ]
                ++ List.map viewFloor model.floors
        }


wallPosX : Scene3d.Entity Physics.WorldCoordinates
wallPosX =
    -- Scene3d.quadWithShadow
    --     (Scene3d.Material.matte (Color.rgba 0.3 0.3 1 0.4))
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) 10)
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) 10)
    Scene3d.nothing


wallNegX : Scene3d.Entity Physics.WorldCoordinates
wallNegX =
    Scene3d.quadWithShadow
        (Scene3d.Material.matte Color.gray)
        (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) -800)
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) -800)
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) 10)
        (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) 10)


wallPosY : Scene3d.Entity Physics.WorldCoordinates
wallPosY =
    -- Scene3d.quadWithShadow
    --     (Scene3d.Material.matte (Color.rgba 0.3 0.3 1 0.4))
    --     (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) -800)
    --     (Point3d.meters (maxExtent + 0.01) (maxExtent + 0.01) 10)
    --     (Point3d.meters (-maxExtent - 0.01) (maxExtent + 0.01) 10)
    Scene3d.nothing


wallNegY : Scene3d.Entity Physics.WorldCoordinates
wallNegY =
    Scene3d.quadWithShadow
        (Scene3d.Material.matte Color.gray)
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) -800)
        (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) -800)
        (Point3d.meters (maxExtent + 0.01) (-maxExtent - 0.01) 10)
        (Point3d.meters (-maxExtent - 0.01) (-maxExtent - 0.01) 10)


viewFloor : ( Scene3d.Mesh.Uniform Physics.BodyCoordinates, Scene3d.Mesh.Shadow Physics.BodyCoordinates ) -> Scene3d.Entity Physics.WorldCoordinates
viewFloor ( mesh, shadow ) =
    Scene3d.meshWithShadow
        (Scene3d.Material.matte Color.white)
        mesh
        shadow
        |> Scene3d.placeIn Frame3d.atOrigin


camera : Point3d Length.Meters Physics.WorldCoordinates -> Camera3d.Camera3d Length.Meters Physics.WorldCoordinates
camera playerPosition =
    Camera3d.lookAt
        { eyePoint =
            playerPosition
                |> Point3d.translateBy (Vector3d.meters 3 3 3)
        , focalPoint = playerPosition
        , upDirection = Direction3d.z
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 90)
        }
