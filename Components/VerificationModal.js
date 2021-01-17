import React from "react";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import EnterOTP from "../screens/EnterOTP";
import Modal from "modal-enhanced-react-native-web";
import { ContextConsumer } from "../Context";
const VerificationModal = ({
  OTPHandlerisEqual,
  visibleModal,
  CellNumber,
  OTP,
  OTPHandler,
  loginAsync,
  setvisibleModal,
  props,
}) => {
  return (
    <Modal
      style={{
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "center",
      }}
      isVisible={visibleModal}
    >
      <ContextConsumer>
        {(context) => {
          return (
            <EnterOTP
              CellNumber={CellNumber}
              OTPHandler={OTPHandler}
              OTP={OTP}
              props={props}
              onPress={() => {
                loginAsync(1),
                  context.dispatch({ type: "SIGN_IN", userToken: 1 });
                setvisibleModal(false);
              }}
            />
          );
        }}
      </ContextConsumer>

      {OTPHandlerisEqual === false && (
        <View
          style={{
            height: hp(20),
            width: wp(80),
            justifyContent: "center",
            position: "absolute",
            bottom: hp(10),
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "black",
              fontWeight: "800",
              fontSize: RFPercentage(2),
              marginTop: hp(5),
            }}
          >
            Incorrect OTP,Please try again.
          </Text>
        </View>
      )}
    </Modal>
  );
};
export default VerificationModal;
