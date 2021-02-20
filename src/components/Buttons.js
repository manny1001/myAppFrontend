//import liraries
import React, { Component, useState } from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BigButton = ({
  background,
  titleStyle,
  activeOpacity,
  onPress,
  containerStyle,
  title,
  buttonStyle,
  disabled,
}) => (
  <Button
    type={"solid"}
    activeOpacity={activeOpacity}
    disabled={disabled}
    onPress={onPress}
    containerStyle={[
      containerStyle,
      { justifyContent: "center", elevation: 15 },
    ]}
    title={title}
    titleStyle={{ fontSize: RFPercentage(2.25), fontWeight: "600" }}
    buttonStyle={{
      ...buttonStyle,
      alignSelf: "center",
      backgroundColor: background === "NONE" ? "" : "#84cfd1",
      width: wp(80),
      height: hp(7),
      borderRadius: wp(20),

      /* 
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 50,
      shadowOffset: { width: 1, height: 13 }, */
    }}
  />
);
export default BigButton;
