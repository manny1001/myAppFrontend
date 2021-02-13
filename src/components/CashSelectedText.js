import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const CashSelectedText = ({ text }) => {
  return (
    <Text
      style={{
        width: wp(85),
        alignSelf: "center",
      }}
    >
      {text}
    </Text>
  );
};

export default CashSelectedText;
