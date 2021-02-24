import React, { useState, lazy, Suspense } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styles from "../styles";
const Loader = () => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          marginRight: 0,
          marginLeft: 0,
          marginTop: 0,
          marginBottom: 0,
        },
      ]}
    >
      {/* <ActivityIndicator color="#6c63ff" size="large" /> */}
      {/* <Image
        style={styles.loadingGify}
        source={require("../../assets/gifys/4V0b.gif")}
      /> */}

      <Text
        style={{
          marginTop: hp(4),
          alignSelf: "center",
          fontFamily: "Gotham_Medium_Regular",
          fontSize: RFPercentage(3),
        }}
      >
        App loading...
      </Text>
    </View>
  );
};
export const LoadingContent = () => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          marginRight: 0,
          marginLeft: 0,
          marginTop: 0,
          marginBottom: 0,
        },
      ]}
    >
      {/* <ActivityIndicator color="#6c63ff" size="large" /> */}
      <Text
        style={{
          marginTop: hp(4),
          alignSelf: "center",
          fontFamily: "Gotham_Medium_Regular",
          fontSize: RFPercentage(3),
        }}
      >
        Awaiting Response...
      </Text>
    </View>
  );
};
export default Loader;
