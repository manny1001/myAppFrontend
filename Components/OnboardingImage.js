import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const OnboardingImage = ({ source }) => {
  return (
    <Image
      source={{ uri: source }}
      style={{
        height: hp(90),
        width: wp(100),
        alignSelf: "center",
        position: "absolute",
        top: 0,
        resizeMode: "contain",
      }}
    />
  );
};
export default OnboardingImage;
