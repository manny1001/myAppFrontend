//import liraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
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
  console.log(driverduration);
  return (
    <>
      <Text
        style={{
          fontFamily: "Gotham_Medium_Regular",
          fontSize: RFValue(24),
          fontWeight: "600",
        }}
      >
        Details
      </Text>
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
