import React, { useState, lazy, Suspense } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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
    </View>
  );
};
export default Loader;
