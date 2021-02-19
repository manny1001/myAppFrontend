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
    containerStyle={[containerStyle, { justifyContent: "center" }]}
    title={title}
    titleStyle={{ fontSize: RFPercentage(2) }}
    buttonStyle={{
      ...buttonStyle,
      alignSelf: "center",
      backgroundColor: background === "NONE" ? "" : "#84cfd1",
      width: wp(50),
      height: hp(10),
    }}
  />
);
export default BigButton;
