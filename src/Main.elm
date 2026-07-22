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
import Length exposing (Length)
import Physics exposing (onEarth)
import Physics.Material
import Physics.Shape
import Pixels exposing (Pixels)
import Point3d exposing (Point3d)
import Scene3d
import Scene3d.Material
import Sphere3d exposing (Sphere3d)
import Timestep exposing (Timestep)
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
      }
    , Cmd.none
    )


initTimestep : Timestep
initTimestep =
    Timestep.init
        -- { duration = Duration.seconds (1 / 120)
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
        (Length.meters 0.5)


subscriptions : Model -> Sub Msg
subscriptions model =
    Browser.Events.onAnimationFrameDelta (\d -> Tick (Duration.milliseconds d))


type Msg
    = Tick Duration


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick delta ->
            ( Timestep.advance simulateStep delta model, Cmd.none )


simulateStep model =
    let
        ( newBodies, newContacts ) =
            Physics.simulate
                { onEarth
                    | contacts = model.contacts
                    , duration = Timestep.duration model.timestep
                }
                model.bodies
    in
    { model | bodies = newBodies, contacts = newContacts }



view : Model -> Browser.Document Msg
view model =
    { title = "Ball Fall"
    , body =
        [ Html.h1 [] [ Html.text "Ball Fall" ]
        , Scene3d.sunny
            { upDirection = Direction3d.z
            , sunlightDirection = Direction3d.negativeZ
            , shadows = True
            , dimensions = ( Pixels.int 800, Pixels.int 600 )
            , camera =
                Camera3d.lookAt
                    { eyePoint = Point3d.meters 3 3 3
                    , focalPoint = Point3d.meters 0 0 0
                    , upDirection = Direction3d.z
                    , projection = Camera3d.Perspective
                    , fov = Camera3d.angle (Angle.degrees 90)
                    }
            , clipDepth = Length.millimeters 2
            , background = Scene3d.backgroundColor Color.blue
            , entities =
                List.map
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
        ]
    }
