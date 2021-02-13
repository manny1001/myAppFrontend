//import liraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const TripDetails = ({
  selectedValue,
  name,
  clientLastName,
  clientCellNumber,
  location,
  timeRequested,
}) => {
  return (
    <View
      style={{
        flex: selectedValue === "Cash" ? 0.5 : 1,
        width: wp(90),
        alignSelf: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Text style={{ fontSize: RFValue(24), fontWeight: "600" }}>Details</Text>
      <Text>
        {name} {clientLastName}
      </Text>
      <Text>{location}</Text>
      <Text>{timeRequested}</Text>
      <Text>{clientCellNumber}</Text>
    </View>
  );
};

export default TripDetails;
