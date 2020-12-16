import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getAllSpots } from "../services/spot";

export default function AddSpot(props) {
  const [viewport, setViewport] = useState({
    longitude: 2.1573080086964103,
    latitude: 41.38821563759946,
    width: "60vw",
    height: "60vh",
    zoom: 14,
  });

  const [allSpots, setAllSpots] = useState([]);

  useEffect(() => {
    getAllSpots().then((allSpotsFromDB) => {
      // console.log(allSpotsFromDB);
      setAllSpots(allSpotsFromDB);
    });
  }, []);

  //   console.log("ALL SPOTS IN OUR DB", allSpots);\
  console.log("USER ID!!!!", props.user._id);

  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div>
      <h1>Choose your parking spot</h1>
      <br></br>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/gosiamas/ckij2w5xq3wmw19pm3f1ivrsj"
      >
        {allSpots
          .filter((spot) => {
            return !spot.userBooking.includes(props.user._id);
          })
          .map((spot) => (
            <Marker
              key={spot._id}
              latitude={spot.latitude}
              longitude={spot.longitude}
            >
              <button
                style={{ padding: 0 }}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedSpot(spot);
                }}
              >
                <img
                  style={{ width: "10px", height: "10px" }}
                  src="../../bikep__2_.jpg"
                  alt="parking icon"
                />
              </button>
            </Marker>
          ))}

        {selectedSpot && (
          <div style={{ background: "red", zIndex: 12 }}>
            <Popup
              latitude={selectedSpot.latitude}
              longitude={selectedSpot.longitude}
              closeButton={true}
              //   closeButton//
              //   onClose={() => console.log("CLOSE")}
              onClose={() => {
                //console.log("CLOSING?");
                setTimeout(() => {
                  setSelectedSpot(null);
                }, 50);
              }}
            >
              <div>
                <h3>{selectedSpot.name}</h3>
                <p style={{ maxWidth: "30vw" }}>{selectedSpot.address}</p>
                <p>Vacant spaces {selectedSpot.vacantSpaces}</p>
                {selectedSpot.vacantSpaces === 0 ? (
                  <p>No vacant spaces, choose another spot</p>
                ) : (
                  <Link to={`/payment/${selectedSpot._id}`} className="link">
                    Book
                  </Link>
                )}
              </div>
            </Popup>
          </div>
        )}
      </ReactMapGL>
    </div>
  );
}
