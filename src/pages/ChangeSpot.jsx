// import React, { Component } from "react";
// import MapComp from "../components/MapComp";

// export default class ChangeSpot extends Component {
//   render() {
//     return (
//       <div>
//         Change Spot Page
//         <MapComp spotId={this.props.match.params.id} />
//       </div>
//     );
//   }
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getAllSpots } from "../services/spot";
import axios from "axios";

export default function ChangeSpot(props) {
  const [viewport, setViewport] = useState({
    longitude: 2.1573080086964103,
    latitude: 41.38821563759946,
    width: "60vw",
    height: "60vh",
    zoom: 14,
  });

  const [allSpots, setAllSpots] = useState([]);

  const bookedSpot = props.match.params.id;
  console.log(bookedSpot);

  useEffect(() => {
    getAllSpots().then((allSpotsFromDB) => {
      // console.log(allSpotsFromDB);
      setAllSpots(allSpotsFromDB);
    });
  }, []);

  //   console.log("ALL SPOTS IN OUR DB", allSpots);\

  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleSpotChange = (selectedSpotId) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/spots/${bookedSpot}`,
        { newSpotId: { selectedSpotId } },
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((data) => console.log(data))
      .catch((err) => err);
  };
  //   axios call with selected spot and chenged spot and user
  //   to update both spots in database
  //  after response all ok
  //   .then to redirect to profile page
  //

  return (
    <div>
      <h1>Choose your new parking spot</h1>
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
            return spot._id !== bookedSpot;
          })
          .map((remainingSpot) => (
            <Marker
              key={remainingSpot._id}
              latitude={remainingSpot.latitude}
              longitude={remainingSpot.longitude}
            >
              <button
                style={{ padding: 0 }}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedSpot(remainingSpot);
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

        {/* {allSpots.filter((spot) => {
          spot._id === bookedSpot && (
            <Marker
              key={spot._id}
              latitude={spot.latitude}
              longitude={spot.longitude}
            >
              <img
                style={{ width: "10px", height: "10px" }}
                src="../../redpin.png"
                alt="red pin icon"
              />
            </Marker>
          );
        })} */}

        {selectedSpot && (
          <div style={{ background: "red", zIndex: 12 }}>
            <Popup
              latitude={selectedSpot.latitude}
              longitude={selectedSpot.longitude}
              closeButton={true}
              onClose={() => {
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
                  <button
                    style={{ padding: 0 }}
                    onClick={(event) => {
                      event.preventDefault();
                      //   console.log(selectedSpot._id);
                      handleSpotChange(selectedSpot._id);
                    }}
                  >
                    Change
                  </button>
                )}
              </div>
            </Popup>
          </div>
        )}
      </ReactMapGL>
    </div>
  );
}

{
  /* <Link to={`/payment/${selectedSpot._id}`}>Book</Link> */
}
