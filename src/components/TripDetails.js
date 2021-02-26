//import liraries
import { React, Text, RFValue } from "../api/constants";

const TripDetails = ({
  name,
  clientLastName,
  cellphone,
  location,
  destination,
  driverduration,
  driverName,
  driverSurName,
  model,
  registration,
  timeRequested,
}) => {
  return (
    <>
      <Text style={{}}>Details</Text>
      <Text>
        {name} {clientLastName}
      </Text>
      <Text>{location}</Text>
      <Text>{destination}</Text>
      <Text>{(driverduration / 60).toFixed(0)} mins away</Text>
      <Text>
        {driverName} {driverSurName}
      </Text>
      <Text>{model}</Text>
      <Text>{registration}</Text>
      <Text>{timeRequested}</Text>
      <Text>{cellphone}</Text>
    </>
  );
};

export default TripDetails;
