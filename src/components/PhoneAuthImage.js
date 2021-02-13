import React from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const PhoneAuthImage = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        flex: 1,
        width: wp(100),
        resizeMode: "contain",
      }}
    />
  );
};

export default PhoneAuthImage;
