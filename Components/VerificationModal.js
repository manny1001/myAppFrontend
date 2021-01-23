import React from "react";
import { Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Enterotp from "../screens/Enterotp";
import Modal from "modal-enhanced-react-native-web";
import { ContextConsumer } from "../Context";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
const VerificationModal = ({
  otpHandlerisEqual,
  visibleModal,
  cellphone,
  otp,
  OTPHandler,
  setvisibleModal,
  props,
}) => {
  const LOGIN = gql`
    mutation login($cellphone: String!, $otp: String!) {
      login(cellphone: $cellphone, otp: $otp) {
        token
        user {
          username
        }
      }
    }
  `;
  const [login, { loading, error, data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(loading, error);
    },
    onCompleted: () => {
      console.log(data);
    },
  });
  const loginAsync = async (value) => {
    try {
      /* await AsyncStorage.setItem("accessToken", value); */
    } catch (e) {
      console.log(e);
    }
  };
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
            <Enterotp
              cellphone={cellphone}
              OTPHandler={OTPHandler}
              otp={otp}
              props={props}
              onPress={() => {
                /*  setvisibleModal(false); */
                /* context.dispatch({
                    type: "SIGN_IN",
                    payload: {
                      userToken: 1,
                    },
                  }); */
              }}
            />
          );
        }}
      </ContextConsumer>

      {otpHandlerisEqual === false && (
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
            Incorrect otp,Please try again.
          </Text>
        </View>
      )}
    </Modal>
  );
};
export default VerificationModal;
