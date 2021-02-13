import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "react-native-elements";
const ProfilePicture = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={{
        width: wp(35),
        height: wp(35),
        borderRadius: wp(17.5),
      }}
      PlaceholderContent={<ActivityIndicator />}
    />
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
export default ProfilePicture;
