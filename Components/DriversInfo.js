import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const DriversInfo = ({ DriverName, DriverCarModel, DriverRegistration }) => {
  return (
    <View style={styles.TopInfo}>
      <Text
        style={{
          alignSelf: "center",
          flexDirection: "column",
          fontSize: RFPercentage(2),
        }}
      >
        {DriverName}
      </Text>
      <Text
        style={{
          alignSelf: "center",
          flexDirection: "column",
          fontSize: RFPercentage(2),
        }}
      >
        {DriverCarModel}
      </Text>
      <Text
        style={{
          fontSize: RFPercentage(2),
          alignSelf: "center",
          fontWeight: "700",
        }}
      >
        {DriverRegistration}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  TopInfo: {
    width: wp(32),
    height: wp(32),
    alignSelf: "center",
    borderRadius: wp(16),
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 6,
    backgroundColor: "white",
  },
});
export default DriversInfo;
