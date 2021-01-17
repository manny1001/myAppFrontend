import React from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AcceptTermsButton = ({ onPress }) => {
  return (
    <View
      style={{
        height: wp(90),
        width: wp(90),
        top: 0,
        alignSelf: "center",
      }}
    />
  );
};
export default AcceptTermsButton;
