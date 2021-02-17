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
        width: wp(90),

        alignSelf: "center",
      }}
    />
  );
};
export default AcceptTermsButton;
