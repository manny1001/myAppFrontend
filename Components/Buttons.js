//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BigButton = ({
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
    containerStyle={containerStyle}
    title={title}
    buttonStyle={{
      ...buttonStyle,
      backgroundColor: "#6c63ff",
      width: wp(50),
      height: hp(10),
    }}
    titleStyle={titleStyle}
  />
);
export default BigButton;
