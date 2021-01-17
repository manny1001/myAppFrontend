import React, { lazy } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const OnboardingImage = lazy(() => import("../Components/OnboardingImage"));
import { RFValue } from "react-native-responsive-fontsize";
const OnboardingSlide = ({ item }) => {
  return (
    <View
      style={{
        height: hp(100),
        width: wp(100),
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          top: hp(5),
          position: "absolute",
          alignSelf: "center",
          color: "#6c63ff",
          fontSize: RFValue(22),
          fontWeight: "bold",
          zIndex: 100,
        }}
      >
        {item.description}
      </Text>

      <OnboardingImage source={item.image} />
    </View>
  );
};
export default OnboardingSlide;
