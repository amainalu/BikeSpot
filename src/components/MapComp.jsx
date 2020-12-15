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

  const [allTransactions, setAllTransactions] = useState([]);

  //   const bookedSpot = props.spotId;
  //   console.log(bookedSpot);

  console.log(props.transData);

  useEffect(() => {
    // getAllSpots().then((allSpotsFromDB) => {
    //   //console.log(allSpotsFromDB);
    setAllTransactions(props.transData);
    // });
  }, []);

  //below map and filter for profile spots
  //   const spotProps = props.transData.map((el) => {
  //     return el.transSpot;
  //   });
  //   console.log(spotProps);

  // .filter((spot) => {
  //         return spot._id === spotProps._id;
  //       });
  //   console.log("ALL SPOTS IN OUR DB", allSpots);\

  //const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div>
      <h1>These are your parking spot</h1>
      <br></br>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/gosiamas/ckij2w5xq3wmw19pm3f1ivrsj"
      >
        {allTransactions.map((trans) => (
          <Marker
            key={trans._id}
            latitude={trans.transSpot.latitude}
            longitude={trans.transSpot.longitude}
          ></Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

{
  /* {selectedSpot && (
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
                {/* <p>Vacant spaces {selectedSpot.vacantSpaces}</p>
                {selectedSpot.vacantSpaces === 0 ? (
                  <p>No vacant spaces, choose another spot</p>
                ) : (
                  <Link to={`/payment/${selectedSpot._id}`}>Book</Link>
                )} */
}
//     </div>
// </Popup> */}
//     </div>
// )}

{
  /* <button
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
            </button> */
}
