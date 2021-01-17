import React, { useState, lazy } from "react";
import { View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInput from "../Components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { ContextConsumer } from "../Context";
const VerificationModal = lazy(() => import("../Components/VerificationModal"));
const BigButton = lazy(() => import("../Components/Buttons"));
const PhoneAuthImage = lazy(() => import("../Components/PhoneAuthImage"));
const PhoneAuth = ({ props }) => {
  const [CellNumber, setCellNumber] = React.useState(1451651515);
  const [visibleModal, setvisibleModal] = React.useState(false);
  const [OTP, setOTP] = React.useState("4545");
  const [OTPHandlerisEqual, setOTPHandlerisEqual] = useState(false);
  const loginAsync = async (value) => {
    try {
      await AsyncStorage.setItem("loggedInTrue", value);
    } catch (e) {
      console.log(e);
    }
  };
  const OTPHandler = (val) => {
    setOTPHandlerisEqual(val);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <VerificationModal
        {...props}
        OTPHandlerisEqual={OTPHandlerisEqual}
        visibleModal={visibleModal}
        CellNumber={CellNumber}
        OTP={OTP}
        OTPHandler={OTPHandler}
        loginAsync={loginAsync}
        setvisibleModal={setvisibleModal}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <PhoneAuthImage />
        <View style={{ flex: 1 }}>
          <TextInput
            maxLength={10}
            style={{
              backgroundColor: "#f3f3f3",
              alignSelf: "center",
              width: wp(60),
              height: hp(6),
              fontSize: RFValue(14),
            }}
            keyboardType={"default"}
            label="eg. 012 345 6789"
            text={CellNumber}
            onChangeText={(text) => setCellNumber(text)}
          />
        </View>
      </View>
      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              disabled={CellNumber.length === 10 ? false : true}
              onPress={() => {
                context.dispatch({ type: "SAVE_CELL", cell: CellNumber });
                setvisibleModal(true);
              }}
              title={"Sign In"}
            />
          );
        }}
      </ContextConsumer>
    </View>
  );
};
export default PhoneAuth;
