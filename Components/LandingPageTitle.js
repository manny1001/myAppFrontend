import React from "react";
import { Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const LandingPageTitle = ({ text }) => {
  return (
    <Text
      style={{
        zIndex: 6,
        alignSelf: "center",
        fontSize: RFValue(25),
        fontWeight: "600",
        color: "black",
      }}
    >
      {text}
    </Text>
  );
};
export default LandingPageTitle;
