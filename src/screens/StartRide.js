import { React, Location, StackActions, StartRide } from "../api/constants";
/* import { getTripInfo, getlocation } from "../../src/utilites/utilities"; */

export default function (props) {
 

  const { navigation } = props;
  const pushAction = StackActions.push("Confirm");

  const [errorMsg, seterrorMsg] = React.useState(null);
  const [latitude, setlatitude] = React.useState(null);
  const [longitude, setlongitude] = React.useState(null);
  const [locationSelected, setlocationSelected] = React.useState(false);
  const [distance, setdistance] = React.useState(null);
  const [time, settime] = React.useState(null);
  const [DestinationSelected, setDestinationSelected] = React.useState(true);
  const [isClicked, setisClicked] = React.useState(false);
  const [urgency, setUrgency] = React.useState(null);
  const setCurrentLocationHandler = (val) => {
    setcurrentLocation(val);
  };
  const [currentLocation, setcurrentLocation] = React.useState(props.currentLocation);
  const [destination, setdestination] = React.useState(props.destination);

  return (
    <StartRide
      {...props}
      isClicked={isClicked}
      setisClicked={setisClicked}
      locationSelected={locationSelected}
      setlocationSelected={setlocationSelected}
      destination={destination}
      currentLocation={currentLocation}
      setdestination={setdestination}
      setcurrentLocation={setcurrentLocation}
      setCurrentLocationHandler={setCurrentLocationHandler}
      setDestinationSelected={setDestinationSelected}
      getTripInfo={() => getTripInfo()}
      time={time}
      distance={distance}
      DestinationSelected={DestinationSelected}
      urgency={urgency}
      setUrgency={(val) => setUrgency(val)}
    />
  );
}
