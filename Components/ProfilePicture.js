import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const ProfilePicture = ({ source, style }) => {
  return (
    <View
      style={[
        styles.TopInfo,
        { alignSelf: "flex-start", borderWidth: 0, backgroundColor: "" },
      ]}
    >
      <Image style={style} source={source} />
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
export default ProfilePicture;
