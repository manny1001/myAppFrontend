//import liraries
import React, { Component, useState } from "react";
import { Button, ThemeProvider } from "react-native-elements";
import { TouchableOpacity, Text } from "react-native";
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
  <TouchableOpacity
    disabled={disabled}
    containerStyle={[containerStyle, { justifyContent: "center" }]}
    activeOpacity={activeOpacity}
    onPress={onPress}
    style={{
      shadowColor: "rgba(0,0,0, .4)", // IOS
      shadowOffset: { height: 3, width: 3 }, // IOS
      shadowOpacity: 0.25, // IOS
      shadowRadius: 1, //IOS
      backgroundColor: disabled ? "#cccccc" : "#84cfd1",
      elevation: 2, // Android
      width: wp(80),
      height: hp(5),
      justifyContent: "center",
      borderRadius: wp(20),
      alignItems: "center",
      flexDirection: "row",
      alignSelf: "center",
    }}
  >
    <Text
      style={{
        fontWeight: "bold",
        alignSelf: "center",
        color: "white",
        fontSize: wp(5),
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

export default BigButton;
