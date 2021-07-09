import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";


export default function Map({truckData, userLoc}) {

  console.log(process.env.REACT_APP_MAPBOX_TOKEN);

  
  const [selectedTruck, setSelectedTruck] = useState();
  const [longitude, setLongitude] = useState(userLoc[0] );
  const [latitude, setLatitude]  = useState(userLoc[1] );

  const [viewport, setViewport] = useState({
    latitude:latitude || 37.78844615690132,
    longitude: longitude || -122.3986412420388,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedTruck(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);



  //handling search results
  const handleSearch = (e) => {
    e.preventDefault();
    setViewport(
      {    
        latitude:parseFloat (latitude),
        longitude: parseFloat (longitude),
        width: "100vw",
        height: "100vh",
        zoom: 10
      }
    )

  }

  console.log( viewport)
  return (
    <>
    {/* header */}
    <div className="container">

   
    <div className="d-flex justify-content-center">
      <p class="fs-1 fw-bold text-decoration-underline">Find your Truck</p>
     
    </div>
    <div>
    <p>1.Click on the icons to get the truck details</p>
      <p>2.Use mouse scroll to zoom in or zoom out</p>
      <p>3.Use double-right click to zoom in and move around on map</p>
      <p>4.Use left click to change the view level.</p>
      <p>ENJOY THE JOURNEY!!</p>
    </div>
 


    <div>
        <div className="d-flex justify-content-center">
        <p class="fs-1 fw-bold text-decoration-underline">Enter your Loaction</p>
     
    </div>

    {/* form */}
    <form onSubmit={handleSearch}>
      {/* <input type="number" placeholder="Enter latitude"  onChange={(e) => setLatitude(e.target.value) }></input>
      <input type="number" placeholder="Enter longitude"  onChange={(e) => setLongitude(e.target.value) }></input>
      <button>Submit</button> */}
     
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Enter Latitude</label>
          <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="number" placeholder="Enter latitude"  onChange={(e) => setLatitude(e.target.value) }/>
          
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Enter Longitude</label>
          <input type="number" placeholder="Enter longitude"  onChange={(e) => setLongitude(e.target.value) } className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
     
    </form>
    </div>
    </div>
    <div>
      <ReactMapGL
        {...viewport}
        //mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapboxApiAccessToken="pk.eyJ1Ijoic3ViaGFtMjQ0OCIsImEiOiJja3F2Mzl1Y2cwYWttMm9vNXNoczFqaWRnIn0.Ya90wkDksdk7qRn-YpxTrg"
        mapStyle="mapbox://styles/subham2448/ckqv3rkp71j1e18m4qwoy2xem"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {truckData && truckData.map(truckDetails => (
       
              <Marker
            key={truckDetails.objectid}
            latitude={parseFloat(truckDetails.latitude)}
            longitude={parseFloat(truckDetails.longitude)}
          >
          {/* <p>{truckDetails.fooditems}</p> */}
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedTruck(truckDetails);
              }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon" />
            </button>
          </Marker>
          
        ))}

        {selectedTruck ? (
          <Popup
            latitude={parseFloat(selectedTruck.latitude)}
            longitude={parseFloat(selectedTruck.longitude)}
            onClose={() => {
              setSelectedTruck(null);
            }}
          >
            <div>
              <p  className="text-center fw-bold">{selectedTruck.applicant}</p>
              <p>{selectedTruck.fooditems}</p>
              {/* <p>{selectedPark.properties.DESCRIPTIO}</p> */}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
    </>
  );
}
