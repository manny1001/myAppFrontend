import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const LandingPageButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Trip");
      }}
      style={{
        justifyContent: "center",
        alignSelf: "center",
        height: wp(20),
        width: wp(20),
        padding: wp(3),
        borderWidth: hp(0.5),
        borderColor: "#CDCDCD",
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: RFPercentage(5),
          color: "white",
          fontWeight: "bold",
        }}
      >
        Trip
      </Text>
    </TouchableOpacity>
  );
};

export default LandingPageButton;
