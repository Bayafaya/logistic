import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Button, Input } from "antd";
import { EnvironmentFilled, ClearOutlined } from "@ant-design/icons";
const libraries = ["places"];
function Map() {
  const center = { lat: 44, lng: -80 };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [map, setMap] = useState(/**@type google.maps.Map*/ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pickedPlace,setPickedPlace] = useState([])
  /**@type React.MutableRefObject.<HTMLInputElement>*/
  const originRef = useRef();
  /**@type React.MutableRefObject.<HTMLInputElement>*/
  const destinationRef = useRef();

  const calcRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };
  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };
useEffect(()=>{
  checkDirection()

},[pickedPlace])

const checkDirection = async()=>{
const get = [...pickedPlace]

if(pickedPlace.length > 2 ){
  get.shift()
  get.pop()
  console.log(get);
}
  if(pickedPlace.length > 1){
  const directionService = new google.maps.DirectionsService();
  const result = await directionService.route({
    origin: pickedPlace[0],
    destination: pickedPlace[pickedPlace.length - 1],
    travelMode: google.maps.TravelMode.DRIVING,
    waypoints: pickedPlace.length > 2 ? get.map(item=>({location:item})) : [],
  });
  setDirectionsResponse(result);
 }
}

  const handLeClick = (ev)=>{
    setPickedPlace([...pickedPlace, new google.maps.LatLng(ev.latLng.lat(),ev.latLng.lng())])
  }

  if (!isLoaded) return <div>loading</div>;
  return (
    <>
      <div className="fixed w-screen top-6 z-10 flex justify-center items-center">
        <div className="bg-white space-y-3 w-[420px] rounded p-6">
          <div className="flex gap-3 items-center">
            <Autocomplete>
              <input className="h-10 text-base w-full border rounded px-1 outline-none" placeholder="Please input your place" ref={originRef} />
            </Autocomplete>
            <Autocomplete>
              <input className="h-10 text-base w-full border rounded px-1 outline-none" placeholder="Please input your place" ref={destinationRef}/>
            </Autocomplete>
          </div>
          <div className="flex justify-between gap-3">
            <Button
              type="primary"
              className="bg-primary"
              block
              onClick={calcRoute}
              size="large"
            >
              Confirm
            </Button>

            <Button
              className="grid place-items-center"
              onClick={() => map.panTo(center)}
              size="large"
              icon={<EnvironmentFilled />}
            />
            <Button
              className="grid place-items-center"
              onClick={() => map.panTo(center)}
              size="large"
              icon={<ClearOutlined />}
            />
          </div>
          <div className="grid grid-cols-2">
            <span>distance: {distance}</span>
            <span>duration: {duration}</span>
          </div>
        </div>
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="h-screen w-screen"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
        onClick={ev => handLeClick(ev)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer options={{ directions: directionsResponse }} />
        )}
      </GoogleMap>
    </>
  );
}

export default Map;
