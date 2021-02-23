import React, { Component, lazy } from "react";
/* import { getTripInfo, getlocation } from "../../src/utilites/utilities"; */
import { StoreData } from "../utilites/GFunctions";
import * as Location from "expo-location";
const StartRide = lazy(() => import("../components/RidePresentational"));

export default function (props) {
  const [currentLocation, setcurrentLocation] = React.useState(
    "0A 2nd Road, Halfway House Estate, Midrand, 1685, South Africa"
  );
  const [destination, setdestination] = React.useState(
    "Carlswald Midrand, South Africa"
  );
  const [errorMsg, seterrorMsg] = React.useState(null);
  const [latitude, setlatitude] = React.useState(null);
  const [longitude, setlongitude] = React.useState(null);
  const [locationSelected, setlocationSelected] = React.useState(false);
  const [distance, setdistance] = React.useState(null);
  const [time, settime] = React.useState(null);
  const [DestinationSelected, setDestinationSelected] = React.useState(true);
  const [isClicked, setisClicked] = React.useState(false);

  const setCurrentLocationHandler = (val) => {
    setcurrentLocation(val);
  };
  return (
    <StartRide
      {...props}
      isClicked={isClicked}
      setisClicked={setisClicked}
      locationSelected={locationSelected}
      setlocationSelected={setlocationSelected}
      currentLocation={currentLocation}
      setCurrentLocationHandler={setCurrentLocationHandler}
      getTripInfo={() => getTripInfo()}
      destination={destination}
      time={time}
      distance={distance}
      DestinationSelected={DestinationSelected}
      setDestinationSelected={setDestinationSelected}
      setdestination={setdestination}
    />
  );
}
