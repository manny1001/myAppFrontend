import React, { useState, lazy } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInput from "../Components/TextInput";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "modal-enhanced-react-native-web";
import { ContextConsumer } from "../Context";
import { useMutation } from "@apollo/client";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const BigButton = lazy(() => import("../Components/Buttons"));
const PhoneAuthImage = lazy(() => import("../Components/PhoneAuthImage"));
const PhoneAuth = (props) => {
  const [OTP, setOTP] = React.useState("4545");
  const [cellphone, setcellphone] = React.useState(1451651515);
  const [visibleModal, setvisibleModal] = React.useState(true);
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  /* const LOGIN_MUTATION = gql`
    mutation LoginMutation($cellphone: String!, $otp: String!) {
      login(cellphone: $cellphone, otp: $otp) {
        token
        user {
          username
        }
      }
    }
  `;

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      console.log(loading, error);
    },
    onCompleted: () => {
      console.log(data);
    },
  }); */
  const DelayedFunction = ({ value }) => {
    {
      OTP === value
        ? console.log("its equal")
        : console.log("its NOOOOT equal");
    }
    return null;
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <DelayedFunction OTP={OTP} value={value} />
      <Modal
        style={{
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          alignContent: "center",
        }}
        isVisible={visibleModal}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(3),
              alignSelf: "center",
              color: "white",
            }}
          >
            OTP is: 4545
          </Text>
          <Text style={{ textAlign: "center", fontSize: 30, color: "white" }}>
            Verification Code
          </Text>
          <Text
            style={{
              alignSelf: "center",
              color: "white",
              fontSize: RFPercentage(1.5),
            }}
          >
            Enter the OTP sent to the mobile number *******7765
          </Text>
          <CodeField
            ref={ref}
            {...cellOnLayout}
            value={value}
            onChangeText={(value) => setValue(value)}
            cellCount={CELL_COUNT}
            rootStyle={{
              width: wp(80),

              height: hp(10),
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[
                  {
                    width: wp(15),
                    height: hp(10),
                    backgroundColor: "geeen",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomColor: "white",
                    borderBottomWidth: 5,
                  },
                  isFocused && {
                    borderBottomColor: "#007AFF",
                    borderBottomWidth: 2,
                  },
                ]}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 36,
                    textAlign: "center",
                  }}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        {/* <View
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
        </View> */}
      </Modal>
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

      <BigButton
        disabled={cellphone.length === 10 ? false : true}
        onPress={() => {
          setvisibleModal(true);
        }}
        title={"Sign In"}
      />
    </View>
  );
};
export default PhoneAuth;
