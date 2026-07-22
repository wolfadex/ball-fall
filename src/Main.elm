module Main exposing (main)

import Angle exposing (Angle)
import Block3d exposing (Block3d)
import Browser
import Browser.Events
import Camera3d exposing (Camera3d)
import Color exposing (Color)
import Direction3d exposing (Direction3d)
import Duration exposing (Duration)
import Frame3d exposing (Frame3d)
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode
import Length exposing (Length)
import LineSegment3d exposing (LineSegment3d)
import Physics exposing (onEarth)
import Physics.Material
import Physics.Shape
import Pixels exposing (Pixels)
import Point3d exposing (Point3d)
import Scene3d
import Scene3d.Material
import Set exposing (Set)
import Sphere3d exposing (Sphere3d)
import Timestep exposing (Timestep)
import Torque
import Vector3d exposing (Vector3d)


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
    | Block


type alias Model =
    { bodies : List ( Id, Physics.Body )
    , contacts : Physics.Contacts Id
    , timestep : Timestep
    , keysDown : Set String
    }


init : () -> ( Model, Cmd Msg )
init () =
    ( { bodies =
            ( Ball
            , Physics.sphere
                playerSphere
                Physics.Material.wood
                |> Physics.translateBy (Vector3d.meters 0 0 2)
            )
                :: genFloor
      , contacts = Physics.emptyContacts
      , timestep = initTimestep
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


genFloor : List ( Id, Physics.Body )
genFloor =
    List.map (Tuple.pair Block)
        [ Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters 0 0 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters 1 0 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters 0 1 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters -1 0 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters 0 -1 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters 1 1 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters -1 -1 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters 1 -1 0)
        , Physics.static
            [ ( Physics.Shape.block
                    basicBlock
              , Physics.Material.wood
              )
            ]
            |> Physics.translateBy (Vector3d.meters -1 1 0)
        ]


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
subscriptions model =
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
                                    verticalParts =
                                        if applyForward && applyBackward then
                                            { x = 0, y = 0, z = 0 }

                                        else if applyForward then
                                            Camera3d.frame camera
                                                |> Frame3d.xDirection
                                                |> Direction3d.unwrap
                                                |> (\p -> { x = -p.x, y = -p.y, z = 0 })

                                        else if applyBackward then
                                            Camera3d.frame camera
                                                |> Frame3d.xDirection
                                                |> Direction3d.unwrap

                                        else
                                            { x = 0, y = 0, z = 0 }

                                    horizontalParts =
                                        if applyLeft && applyRight then
                                            { x = 0, y = 0, z = 0 }

                                        else if applyLeft then
                                            Camera3d.frame camera
                                                |> Frame3d.yDirection
                                                |> Direction3d.unwrap
                                                |> (\p -> { x = -p.x, y = -p.y, z = 0 })

                                        else if applyRight then
                                            Camera3d.frame camera
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
        , camera = camera
        , clipDepth = Length.millimeters 2
        , background = Scene3d.backgroundColor Color.black
        , entities =
            Scene3d.lineSegment
                (Scene3d.Material.color Color.red)
                (LineSegment3d.from
                    (Point3d.meters 0 0 1)
                    (Point3d.meters 2 0 1)
                )
                :: Scene3d.lineSegment
                    (Scene3d.Material.color Color.green)
                    (LineSegment3d.from
                        (Point3d.meters 0 0 1)
                        (Point3d.meters 0 2 1)
                    )
                :: Scene3d.lineSegment
                    (Scene3d.Material.color Color.blue)
                    (LineSegment3d.from
                        (Point3d.meters 0 0 1)
                        (Point3d.meters 0 0 3)
                    )
                :: List.map
                    (\( id, body ) ->
                        case id of
                            Ball ->
                                Scene3d.sphereWithShadow
                                    (Scene3d.Material.matte Color.green)
                                    (Sphere3d.placeIn (Physics.frame body)
                                        playerSphere
                                    )

                            Block ->
                                Scene3d.blockWithShadow
                                    (Scene3d.Material.matte Color.white)
                                    (Block3d.placeIn (Physics.frame body)
                                        basicBlock
                                    )
                    )
                    model.bodies
        }


camera =
    Camera3d.lookAt
        { eyePoint = Point3d.meters 3 3 3
        , focalPoint = Point3d.meters 0 0 0
        , upDirection = Direction3d.z
        , projection = Camera3d.Perspective
        , fov = Camera3d.angle (Angle.degrees 90)
        }
