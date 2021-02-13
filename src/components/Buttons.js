//import liraries
import React, { Component, useState } from "react";
import { Button, ThemeProvider } from "react-native-elements";
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
    activeOpacity={activeOpacity}
    disabled={disabled}
    onPress={onPress}
    containerStyle={[containerStyle, { justifyContent: "center" }]}
    title={title}
    buttonStyle={{
      ...buttonStyle,
      alignSelf: "center",
      backgroundColor: background === "NONE" ? "" : "#6c63ff",
      width: wp(50),
      height: hp(10),
    }}
    titleStyle={titleStyle}
  />
);
export default BigButton;
