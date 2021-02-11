import React, { useState, lazy, Suspense } from "react";
import { View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "modal-enhanced-react-native-web";
import TextInput from "../Components/TextInput";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../Queries";
import { GetData, StoreData } from "../GFunctions";
import { ContextConsumer } from "../Context";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const BigButton = lazy(() => import("../Components/Buttons"));
const PhoneAuthImage = lazy(() => import("../Components/PhoneAuthImage"));

const PhoneAuth = ({ context }) => {
  /* function smsOtp(cellphone, otp) {
    let number = "27" + cellphone.slice(1, 10);
    console.log(number);
    var fetchUrl = `
  https://platform.clickatell.com/messages/http/send?apiKey=N4Yb09zfSzip6P1hS86zaQ==&to=${number}&content=Please enter this OTP to verify your cellphone number. ${otp}`;
    fetch(fetchUrl)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad request response from server");
        }
        return response.json();
      })
      .then(function (json) {
        console.log(json);
      });
  } */
  const [cellphone, setcellphone] = React.useState("");
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [login, { data, loading, error, called }] = useMutation(USER_LOGIN);
  const [TOKEN, setTOKEN] = useState(null);
  if (value === "4545") {
    context.dispatch({
      type: "SIGN_IN",
      userToken: TOKEN,
    });
  }
  React.useEffect(() => {
    GetData("accessToken").then((token) => {
      setTOKEN(token);
    });
  }, []);

  const [visibleModal, setvisibleModal] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
      }}
    >
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
      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              disabled={
                cellphone.length !== 10 || called === true ? true : false
              }
              onPress={() => {
                StoreData("clientCellNumber", cellphone);
                login({ variables: { cellphone, type: "user" } })
                  .then(({ data }) => {
                    StoreData("accessToken", data.login.token),
                      setvisibleModal(true);
                  })
                  .catch((e) => {});
                /* login({ variables: { cellphone, type: "user" } });
                  context.dispatch({
                    type: "SIGN_IN",
                    userToken: data && data.login && data.login.userToken,
                  }); */
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
