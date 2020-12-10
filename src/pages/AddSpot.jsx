import React, {useState} from 'react'
import ReactMapGL from "react-map-gl"

export default function AddSpot () {
 const [viewport, setViewport] = useState ({
    longitude: 2.156542,
    latitude: 41.393949,
    width: "50vw",
    height: "50vh",
    zoom: 10,
 })

        return (
            <div>
                <h1>Add route page</h1>
                <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} onViewportChange={viewport => {setViewport(viewport)}
                } mapStyle="mapbox://styles/gosiamas/ckij2w5xq3wmw19pm3f1ivrsj"
                >
          markers here
                </ReactMapGL>
            </div>
        )
    
}
