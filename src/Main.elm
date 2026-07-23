module Main exposing (Id, Model, Msg, main)

import Angle
import Array
import Browser
import Browser.Events
import Camera3d
import Color
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


main : Program Int Model Msg
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type Id
    = Ball
    | FloorPiece
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
    , keysDown : Set String
    }


init : Int -> ( Model, Cmd Msg )
init initialSeed =
    let
        ( ( firstHole, secondHole, thirdHole ), seed ) =
            Random.step
                (Random.map3 (\one two three -> ( one, two, three ))
                    nextHole
                    nextHole
                    nextHole
                )
                (Random.initialSeed initialSeed)

        floor1 =
            generateFloor 0 firstHole

        floor1Tris =
            floorToTris floor1

        floor2 =
            generateFloor -3 secondHole

        floor2Tris =
            floorToTris floor2

        floor3 =
            generateFloor -6 thirdHole

        floor3Tris =
            floorToTris floor3
    in
    ( { player =
            Physics.sphere
                playerSphere
                Physics.Material.wood
                |> Physics.translateBy (Vector3d.meters 0 0 2)
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
                ++ List.map floorTrisToBody floor1Tris
                ++ List.map floorTrisToBody floor2Tris
                ++ List.map floorTrisToBody floor3Tris
      , contacts = Physics.emptyContacts
      , timestep = initTimestep
      , floors =
            [ floorTrisToMesh floor1Tris
            , floorTrisToMesh floor2Tris
            , floorTrisToMesh floor3Tris
            ]
      , seed = seed
      , keysDown = Set.empty
      }
    , Cmd.none
    )


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
    2.5


nextHole : Random.Generator ( Int, Int )
nextHole =
    Random.map2 Tuple.pair
        (Random.int -2 2)
        (Random.int -2 2)


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


floorTrisToBody : TriangularMesh Vert -> ( Id, Physics.Body )
floorTrisToBody floorMesh =
    ( FloorPiece
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
        if holeY < 2 then
            [ Point3d.meters -maxExtent maxExtent zOffset
            , Point3d.meters -maxExtent (toFloat holeY + 0.5) zOffset
            , Point3d.meters maxExtent (toFloat holeY + 0.5) zOffset
            , Point3d.meters maxExtent maxExtent zOffset
            ]

        else
            []
    , rightOfHole =
        if holeY > -2 then
            [ Point3d.meters -maxExtent (toFloat holeY - 0.5) zOffset
            , Point3d.meters -maxExtent -maxExtent zOffset
            , Point3d.meters maxExtent -maxExtent zOffset
            , Point3d.meters maxExtent (toFloat holeY - 0.5) zOffset
            ]

        else
            []
    , forwardOfHole =
        if holeX < 2 then
            [ Point3d.meters (toFloat holeX + 0.5) (toFloat holeY + 0.5) zOffset
            , Point3d.meters (toFloat holeX + 0.5) (toFloat holeY + -0.5) zOffset
            , Point3d.meters maxExtent (toFloat holeY + -0.5) zOffset
            , Point3d.meters maxExtent (toFloat holeY + 0.5) zOffset
            ]

        else
            []
    , backwardOfHole =
        if holeX > -2 then
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
        ]


type Msg
    = Tick Duration
    | KeyDown String
    | KeyUp String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick delta ->
            ( Timestep.advance simulateStep delta model, Cmd.none )

        KeyDown key ->
            ( { model | keysDown = Set.insert key model.keysDown }, Cmd.none )

        KeyUp key ->
            ( { model | keysDown = Set.remove key model.keysDown }, Cmd.none )


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
        [ Html.h1 [] [ Html.text "Ball Fall" ]
        , view3d model
        , Html.text (Debug.toString model.keysDown)
        ]
    }


view3d : Model -> Html Msg
view3d model =
    Scene3d.sunny
        { upDirection = Direction3d.z
        , sunlightDirection =
            Direction3d.negativeZ
                |> Direction3d.rotateAround Direction3d.x
                    (Angle.degrees -30)
        , shadows = True
        , dimensions = ( Pixels.int 800, Pixels.int 600 )
        , camera =
            model.player
                |> Physics.frame
                |> Frame3d.originPoint
                |> camera
        , clipDepth = Length.millimeters 2
        , background = Scene3d.backgroundColor Color.black
        , entities =
            Scene3d.sphereWithShadow
                (Scene3d.Material.matte Color.green)
                (Sphere3d.placeIn (Physics.frame model.player)
                    playerSphere
                )
                :: List.map
                    (\( id, body ) ->
                        case id of
                            Ball ->
                                Scene3d.nothing

                            Wall PosX ->
                                -- Scene3d.quadWithShadow
                                --     (Scene3d.Material.matte Color.gray)
                                --     (Point3d.meters maxExtent maxExtent -800)
                                --     (Point3d.meters maxExtent -maxExtent -800)
                                --     (Point3d.meters maxExtent -maxExtent 10)
                                --     (Point3d.meters maxExtent maxExtent 10)
                                Scene3d.nothing

                            Wall NegX ->
                                Scene3d.quadWithShadow
                                    (Scene3d.Material.matte Color.gray)
                                    (Point3d.meters -maxExtent maxExtent -800)
                                    (Point3d.meters -maxExtent -maxExtent -800)
                                    (Point3d.meters -maxExtent -maxExtent 10)
                                    (Point3d.meters -maxExtent maxExtent 10)

                            Wall PosY ->
                                -- Scene3d.quadWithShadow
                                --     (Scene3d.Material.matte Color.gray)
                                --     (Point3d.meters -maxExtent maxExtent -800)
                                --     (Point3d.meters maxExtent maxExtent -800)
                                --     (Point3d.meters maxExtent maxExtent 10)
                                --     (Point3d.meters -maxExtent maxExtent 10)
                                Scene3d.nothing

                            Wall NegY ->
                                Scene3d.quadWithShadow
                                    (Scene3d.Material.matte Color.gray)
                                    (Point3d.meters -maxExtent -maxExtent -800)
                                    (Point3d.meters maxExtent -maxExtent -800)
                                    (Point3d.meters maxExtent -maxExtent 10)
                                    (Point3d.meters -maxExtent -maxExtent 10)

                            FloorPiece ->
                                Scene3d.nothing
                    )
                    model.bodies
                ++ List.map viewFloor model.floors
        }


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
