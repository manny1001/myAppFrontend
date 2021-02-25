import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  HeaderText: {
    alignSelf: "center",
    color: "white",
    fontSize: "25px",
    fontWeight: "bold",
  },
  HeaderSubText: { alignSelf: "center", color: "white" },
  Header: {
    height: hp(7),
    backgroundColor: "#723BF0",
    justifyContent: "center",
    flexDirection: "column",
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  AcceptTandCs: {
    width: wp(60),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  urgencyButton: { padding: 5 },
  urgencyText: {
    borderWidth: wp(0.3),
    borderRadius: wp(5),
    padding: 5,
  },
  loadingGify: { height: hp(70), width: wp(100), alignSelf: "center" },
  tabBarLabelStyles: { fontSize: RFPercentage(2) },
  tabBarStyle: { height: hp(8) },
  tabIconStyle: { color: "black" },
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
    fontFamily: "Gotham_Medium_Regular",
  },
  locations: {
    fontSize: RFValue(13),
    fontFamily: "Gotham_Medium_Regular",
  },
  timeAndDistanceContainer: {
    justifyContent: "center",
    alignSelf: "stretch",
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
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    alignSelf: "stretch",
    marginRight: wp(10),
    marginLeft: wp(10),
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  inputContainerStyle: {
    backgroundColor: "#f3f3f3",
    fontSize: RFValue(13),
  },
  inputStyle: {
    height: hp(8),
    backgroundColor: "#f2f2f2",
  },
});

export default styles;
