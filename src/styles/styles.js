import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const stylesSmallScreen = StyleSheet.create({
  iconStyle: {
    flex: 0.16,
    justifyContent: "center",
  },
  TopInfo: {
    width: wp(32),
    height: wp(32),
    alignSelf: "center",
    borderRadius: wp(16),
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: wp(1),
    backgroundColor: "white",
  },
  heading2: {
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  locations: {
    fontSize: RFValue(15),
    fontWeight: "400",
  },
  timeAndDistanceContainer: {
    justifyContent: "space-between",
    width: wp(55),
    alignSelf: "center",
    flexDirection: "row",
  },
  profileAvatarContainer: {
    height: hp(20),
    width: hp(20),
    borderRadius: hp(10),
    position: "absolute",
    top: hp(2),
    marginLeft: wp(10),
    bottom: 0,
  },
  profileImage: {
    height: hp(20),
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  cellphoneTextInput: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(60),
    height: hp(6),
    fontSize: RFValue(14),
  },
  heading5: {
    alignSelf: "center",
    fontSize: RFValue(14),
    color: "#6c63ff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: wp(10),
  },
  inputContainerStyle: {
    backgroundColor: "#f3f3f3",
    fontSize: RFValue(13),
  },
  inputStyle: {
    backgroundColor: "#f3f3f3",
    height: hp(6),
  },
});
const stylesBigScreen = StyleSheet.create({
  iconStyle: {
    flex: 0.16,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "space-evenly",
  },
  TopInfo: {
    width: wp(32),
    height: wp(32),
    alignSelf: "center",
    borderRadius: wp(16),
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: wp(1),
    backgroundColor: "white",
  },
  heading2: {
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  locations: {
    fontSize: RFValue(15),
    fontWeight: "400",
  },
  locationsBlock: {
    bottom: hp(3),
    marginLeft: wp(1),
    width: wp(80),
  },
  timeAndDistanceContainer: {
    justifyContent: "space-between",
    width: wp(55),
    alignSelf: "center",
    flexDirection: "row",
  },
  profileAvatarContainer: {
    height: hp(20),
    width: hp(20),
    borderRadius: hp(10),
    position: "absolute",
    top: hp(2),
    marginLeft: wp(10),
    bottom: 0,
  },
  profileImage: {
    width: wp(100),
    height: hp(20),
    alignSelf: "flex-start",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  cellphoneTextInput: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(60),
    height: hp(6),
    fontSize: RFValue(14),
  },
  heading5: {
    alignSelf: "center",
    fontSize: RFValue(14),
    color: "#6c63ff",
  },
  inputStyle: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(80),
    height: hp(6),
    fontSize: RFValue(13),
  },
});
export default windowWidth < 472 ? stylesSmallScreen : stylesBigScreen;
