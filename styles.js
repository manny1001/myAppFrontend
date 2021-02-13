import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
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
    justifyContent: "space-evenly",
    backgroundColor: "#f2f2f2",
  },
  inputStyle: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(80),
    height: hp(6),
    fontSize: RFValue(13),
  },
});
export default styles;
