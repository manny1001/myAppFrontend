import React, { Component, lazy } from "react";
import { Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const HeadingText = ({ selectedValue }) => {
  switch (selectedValue) {
    case "Select":
      return (
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(24),
            fontWeight: "600",
          }}
        >
          Method
        </Text>
      );

    default:
      return (
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(24),
            fontWeight: "600",
          }}
        >
          Method
        </Text>
      );
  }
};

export default HeadingText;
