import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const CallDriver = () => {
  return (
    <TouchableOpacity
      style={[
        styles.TopInfo,
        {
          borderWidth: wp(1),
          height: wp(9),
          alignSelf: "center",
          borderRadius: wp(4),
          borderColor: "green",
          backgroundColor: "#f2f2f2",
        },
      ]}
    >
      <Text style={{ alignSelf: "center" }}>Call your driver</Text>
    </TouchableOpacity>
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
export default CallDriver;
