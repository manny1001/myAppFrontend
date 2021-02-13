import React, { useState, lazy, Suspense } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Loader = () => {
  return (
    <View
      style={{
        height: hp(100),
        width: wp(100),
        justifyContent: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <ActivityIndicator color="#6c63ff" size="large" />
      <Text
        style={{
          marginTop: hp(4),
          alignSelf: "center",
          fontSize: RFPercentage(3),
          fontWeight: "bold",
        }}
      >
        Please wait...
      </Text>
    </View>
  );
};
export default Loader;