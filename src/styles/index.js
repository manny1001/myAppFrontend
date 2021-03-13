import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

const styles = StyleSheet.create({
  startRideMainSection: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
    padding: wp(5),
  },
  switchButton: {
    padding: wp(2.5),
    fontFamily: "Gotham_Medium_Regular",
    alignSelf: "center",
  },
  headingLeft: {
    fontWeight: "bold",
    fontFamily: "Gotham_Medium_Regular",

    alignSelf: "center",
  },
  headingRight: {
    alignSelf: "center",
    borderWidth: wp(0.4),
    borderRadius: wp(20),
    margin: wp(2),
    padding: wp(2),
    fontFamily: "Gotham_Medium_Regular",
    color: "white",
  },
  personalDriverHeadingView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingHeading: { color: "black", alignSelf: "center" },
  /* container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: "#ecf0f1",
    padding: 8,
  }, */
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  onRouteDestination: { alignSelf: "center", margin: wp(5) },
  HeaderText: {
    alignSelf: "center",
    color: "white",
    fontSize: 25,
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
  urgencyButton: {
    padding: 5,
    borderRadius: 25,
    elevation: 6,
    shadowOpacity: 0.2,
    justifyContent: "center",
  },
  urgencyText: {
    borderRadius: wp(5),
    padding: 5,
    alignSelf: "center",
  },
  loadingGify: { height: hp(70), width: wp(100), alignSelf: "center" },
  tabBarLabelStyles: { fontSize: RFPercentage(2) },
  tabBarStyle: { height: hp(8), backgroundColor: "#723BF0" },
  tabIconStyle: { color: "#E8ECFD" },
  iconStyle: {
    flex: 0.16,
    justifyContent: "center",
  },
  TopInfo: {
    width: wp(32),
    height: wp(32),
    alignSelf: "stretch",
    borderRadius: wp(16),
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: wp(1),
    backgroundColor: "white",
  },
  heading1: {
    fontWeight: "bold",
    fontSize: wp(),
  },
  heading2: {
    fontWeight: "bold",
    fontFamily: "Gotham_Medium_Regular",
  },
  locations: {
    fontFamily: "Gotham_Medium_Regular",
  },
  timeAndDistanceContainer: {
    padding: wp(2.5),
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
    backgroundColor: "#723BF0",
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
    backgroundColor: "#723BF0",
    alignSelf: "stretch",
  },
  inputContainerStyle: {
    backgroundColor: "#723BF0",
    fontSize: RFValue(13),
  },
  inputStyle: {
    backgroundColor: "#723BF0",
    width: wp(80),
    alignSelf: "center",
    borderRadius: wp(2),
    borderWidth: wp(0.25),
    borderColor: "#1436D2",
  },
});

export default styles;
