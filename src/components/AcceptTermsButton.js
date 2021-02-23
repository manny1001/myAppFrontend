import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AcceptTermsButton = ({ onPress, isAccepted }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: wp(7),
          height: wp(7),
          borderWidth: 3,
          backgroundColor: isAccepted ? "black" : null,
        }}
      ></View>
    </TouchableOpacity>
  );
};
export default AcceptTermsButton;
