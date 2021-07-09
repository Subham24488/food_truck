import React, { useState, useEffect } from 'react'
import Map from './components/map'
import axios from "axios";



const App = () => {

  const [truckData, setTruckData] = useState();
  const [userLoc, setUserLoc] = useState([]);


  useEffect(() => {
    handleMapData();
    getLocation();
    return () => {
        setTruckData()    
      };
  }, []);


    //downloading the json data
    const handleMapData = async() => {
      await  axios.get("https://data.sfgov.org/resource/rqzj-sfat.json")
       .then((response) =>{
         console.log(response);
         setTruckData(response && response.data)
       })
       .catch(err => {
         console.log(err);
       })
     }

     //getting user present location information
     function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        alert("please provide your location for trucks near you")
      }
    }

    function showPosition(position) {
      setUserLoc([position.coords.latitude, position.coords.latitude ] )
    }

    console.log(userLoc);
  return (
    <div>
      <Map truckData={truckData} userLoc={userLoc}/>
    </div>
  )
}

export default App
