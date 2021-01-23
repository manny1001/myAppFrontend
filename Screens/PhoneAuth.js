import React, { useState, lazy } from "react";
import { View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInput from "../Components/TextInput";
import { RFValue } from "react-native-responsive-fontsize";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const USER_LOGIN = gql`
  mutation login($cellphone: String!, $otp: String!) {
    login(cellphone: $cellphone, otp: $otp) {
      token
    }
  }
`;
import { ContextConsumer } from "../Context";
const VerificationModal = lazy(() => import("../Components/VerificationModal"));
const BigButton = lazy(() => import("../Components/Buttons"));
const PhoneAuthImage = lazy(() => import("../Components/PhoneAuthImage"));

const PhoneAuth = (props) => {
  const [login, { data }] = useMutation(USER_LOGIN);
  console.log(data && data);
  const [cellphone, setcellphone] = React.useState("");
  const [visibleModal, setvisibleModal] = React.useState(false);
  const [OTP, setOTP] = React.useState("4545");
  const [OTPHandlerisEqual, setOTPHandlerisEqual] = useState(false);

  const OTPHandler = (val) => {
    setOTPHandlerisEqual(val);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <ContextConsumer>
        {(context) => {
          data &&
            data.login.token &&
            context.dispatch({
              type: "SIGN_IN",
              userToken: data.login.token,
            });
        }}
      </ContextConsumer>
      <VerificationModal
        props={props}
        OTPHandlerisEqual={OTPHandlerisEqual}
        visibleModal={visibleModal}
        cellphone={cellphone}
        OTP={OTP}
        OTPHandler={OTPHandler}
        setvisibleModal={setvisibleModal}
      />

      <PhoneAuthImage />

      <TextInput
        maxLength={10}
        style={{
          backgroundColor: "#f3f3f3",
          alignSelf: "center",
          width: wp(60),
          height: hp(6),
          fontSize: RFValue(14),
        }}
        keyboardType={"number-pad"}
        label="eg. 012 345 6789"
        text={cellphone}
        onChangeText={(text) => setcellphone(text)}
      />

      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              disabled={cellphone.length === 10 ? false : true}
              onPress={() => {
                login({ variables: { cellphone, otp: "4545" } });
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
