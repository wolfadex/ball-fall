module Main exposing (main)

import Angle
import Array exposing (Array)
import Block3d
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
import Point3d exposing (Point3d)
import Scene3d
import Scene3d.Material
import Scene3d.Mesh
import Set exposing (Set)
import Sphere3d exposing (Sphere3d)
import Timestep exposing (Timestep)
import Torque
import TriangularMesh exposing (TriangularMesh)
import Vector3d


main : Program () Model Msg
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


type alias Model =
    { bodies : List ( Id, Physics.Body )
    , contacts : Physics.Contacts Id
    , timestep : Timestep
    , floors : List ( Scene3d.Mesh.Uniform Physics.BodyCoordinates, Scene3d.Mesh.Shadow Physics.BodyCoordinates )
    , keysDown : Set String
    }


init : () -> ( Model, Cmd Msg )
init () =
    let
        floor =
            generateFloor ( 1, -1 )

        floorMeshes =
            floorToMeshes floor
    in
    ( { bodies =
            ( Ball
            , Physics.sphere
                playerSphere
                Physics.Material.wood
                |> Physics.translateBy (Vector3d.meters 0 0 2)
            )
                :: List.map floorMeshToBody floorMeshes
      , contacts = Physics.emptyContacts
      , timestep = initTimestep
      , floors =
            List.map
                (\tris ->
                    let
                        mesh =
                            Scene3d.Mesh.indexedFacets tris
                    in
                    ( mesh
                    , Scene3d.Mesh.shadow mesh
                    )
                )
                floorMeshes
      , keysDown = Set.empty
      }
    , Cmd.none
    )


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


floorMeshToBody : TriangularMesh Vert -> ( Id, Physics.Body )
floorMeshToBody floorMesh =
    ( FloorPiece
    , Physics.static
        [ ( Physics.Shape.unsafeConvex
                floorMesh
          , Physics.Material.wood
          )
        ]
    )


floorToMeshes : Floor -> List (TriangularMesh Vert)
floorToMeshes floor =
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


{-| initially for a 5x5 grid centered on 0,0 (z is ignored for now)
-}
generateFloor : ( Int, Int ) -> Floor
generateFloor ( holeX, holeY ) =
    { leftOfHole =
        if holeY < 2 then
            [ Point3d.meters -2.5 2.5 0
            , Point3d.meters -2.5 (toFloat holeY + 0.5) 0
            , Point3d.meters 2.5 (toFloat holeY + 0.5) 0
            , Point3d.meters 2.5 2.5 0
            ]

        else
            []
    , rightOfHole =
        if holeY > -2 then
            [ Point3d.meters -2.5 (toFloat holeY - 0.5) 0
            , Point3d.meters -2.5 -2.5 0
            , Point3d.meters 2.5 -2.5 0
            , Point3d.meters 2.5 (toFloat holeY - 0.5) 0
            ]

        else
            []
    , forwardOfHole =
        if holeX < 2 then
            [ Point3d.meters (toFloat holeX + 0.5) (toFloat holeY + 0.5) 0
            , Point3d.meters (toFloat holeX + 0.5) (toFloat holeY + -0.5) 0
            , Point3d.meters 2.5 (toFloat holeY + -0.5) 0
            , Point3d.meters 2.5 (toFloat holeY + 0.5) 0
            ]

        else
            []
    , backwardOfHole =
        if holeX > -2 then
            [ Point3d.meters -2.5 (toFloat holeY + 0.5) 0
            , Point3d.meters -2.5 (toFloat holeY + -0.5) 0
            , Point3d.meters (toFloat holeX - 0.5) (toFloat holeY + -0.5) 0
            , Point3d.meters (toFloat holeX - 0.5) (toFloat holeY + 0.5) 0
            ]

        else
            []
    }



-- genFloor : List ( Id, Physics.Body )
-- genFloor =
--     List.map (Tuple.pair Block)
--         [ Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters 0 0 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters 1 0 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters 0 1 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters -1 0 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters 0 -1 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters 1 1 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters -1 -1 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters 1 -1 -1)
--         , Physics.static
--             [ ( Physics.Shape.block
--                     basicBlock
--               , Physics.Material.wood
--               )
--             ]
--             |> Physics.translateBy (Vector3d.meters -1 1 -1)
--         ]


basicBlock =
    Block3d.centeredOn
        Frame3d.atOrigin
        ( Length.meters 1
        , Length.meters 1
        , Length.meters 1
        )


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
                (List.map
                    (\( id, body ) ->
                        ( id
                        , if id == Ball then
                            let
                                applyForward =
                                    Set.member "ArrowUp" model.keysDown || Set.member "w" model.keysDown

                                applyBackward =
                                    Set.member "ArrowDown" model.keysDown || Set.member "s" model.keysDown

                                applyLeft =
                                    Set.member "ArrowLeft" model.keysDown || Set.member "a" model.keysDown

                                applyRight =
                                    Set.member "ArrowRight" model.keysDown || Set.member "d" model.keysDown
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

                          else
                            body
                        )
                    )
                    model.bodies
                )
    in
    { model | bodies = newBodies, contacts = newContacts }


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
        , sunlightDirection = Direction3d.negativeZ
        , shadows = True
        , dimensions = ( Pixels.int 800, Pixels.int 600 )
        , camera =
            model.bodies
                |> List.filter (\( id, body ) -> id == Ball)
                |> List.head
                |> Maybe.map (\( _, body ) -> Physics.frame body |> Frame3d.originPoint)
                |> Maybe.withDefault (Point3d.meters 0 0 0)
                |> camera
        , clipDepth = Length.millimeters 2
        , background = Scene3d.backgroundColor Color.black
        , entities =
            -- Scene3d.lineSegment
            --     (Scene3d.Material.color Color.red)
            --     (LineSegment3d.from
            --         (Point3d.meters 0 0 1)
            --         (Point3d.meters 2 0 1)
            --     )
            --     :: Scene3d.lineSegment
            --         (Scene3d.Material.color Color.green)
            --         (LineSegment3d.from
            --             (Point3d.meters 0 0 1)
            --             (Point3d.meters 0 2 1)
            --         )
            --     :: Scene3d.lineSegment
            --         (Scene3d.Material.color Color.blue)
            --         (LineSegment3d.from
            --             (Point3d.meters 0 0 1)
            --             (Point3d.meters 0 0 3)
            --         )
            --     ::
            List.map
                (\( id, body ) ->
                    case id of
                        Ball ->
                            Scene3d.sphereWithShadow
                                (Scene3d.Material.matte Color.green)
                                (Sphere3d.placeIn (Physics.frame body)
                                    playerSphere
                                )

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
