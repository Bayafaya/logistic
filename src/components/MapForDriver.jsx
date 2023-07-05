import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button, Input } from "antd";
import { EnvironmentFilled, ClearOutlined } from "@ant-design/icons";
import { usePlace } from "../store/place";
const libraries = ["places"];
function MapForDriver() {
  const center = { lat: 44, lng: -80 };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [map, setMap] = useState(/**@type google.maps.Map*/ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);



  /**@type React.MutableRefObject.<HTMLInputElement>*/
  const originRef = useRef();
  /**@type React.MutableRefObject.<HTMLInputElement>*/
  const destinationRef = useRef();

//   const calcRoute = async () => {
//     if (originRef.current.value === "" || destinationRef.current.value === "") {
//       return;
//     }
//     const directionService = new google.maps.DirectionsService();
//     const result = await directionService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(result);
//     setDistance(result.routes[0].legs[0].distance.text);
//     setDuration(result.routes[0].legs[0].duration.text);
//   };
//   const clearRoute = () => {
//     setDirectionsResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destinationRef.current.value = "";
//   };
// useEffect(()=>{
// //   checkDirection()
// },[places])

// const checkDirection = async()=>{
// const get = [...places]

// if(places.length > 2 ){
//   get.shift()
//   get.pop()

// }
//   if(places.length > 1){
//   const directionService = new google.maps.DirectionsService();
//   const result = await directionService.route({
//     origin: places[0],
//     destination: places[places.length - 1],
//     travelMode: google.maps.TravelMode.DRIVING,
//     // waypoints: places.length > 2 ? get.map(item=>({location:item})) : [],
//   });
//   const geocoder = new google.maps.Geocoder();
//    await  geocoder.geocode({ location: result.request.origin.location }).then(({results})=>setStartAddress(results[0].formatted_address))
//    await geocoder.geocode({ location: result.request.destination.location }).then(({results})=>setEndAddress(results[0].formatted_address))
//   setDirectionsResponse(result);
//  }
// }



  if (!isLoaded) return <div>loading</div>;
  return (
    <>
  
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="h-[500px] lg:h-[700px] w-full mb-[40px]"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer options={{ directions: directionsResponse }} />
        )}
      </GoogleMap>
    </>
  );
}

export default MapForDriver;
