import React from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AcceptTermsButton = ({ onPress }) => {
  return (
    <View
      style={{
        width: wp(90),
        height: hp(60),
        alignSelf: "center",
        borderWidth: wp(0.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ alignSelf: "center" }}>Image</Text>
    </View>
  );
};
export default AcceptTermsButton;
