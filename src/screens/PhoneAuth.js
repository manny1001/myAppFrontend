import React, { useState, lazy, Suspense } from "react";
import { View } from "react-native";
import Modal from "modal-enhanced-react-native-web";
import TextInput from "../../src/components/TextInput";
import { useMutation } from "@apollo/client";
import { USER_LOGIN } from "../../src/utilites/Queries";
import EnterOTP from "../components/EnterOTP";
import { StoreData } from "../../src/utilites/GFunctions";
import styles from "../../src/styles/styles";
const BigButton = lazy(() => import("../../src/components/Buttons"));
const PhoneAuthImage = lazy(() =>
  import("../../src/components/PhoneAuthImage")
);
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
  const [login, { data, loading, error, called }] = useMutation(USER_LOGIN);
  const [visibleModal, setvisibleModal] = React.useState(false);
  return (
    <View style={styles.container}>
      <Modal style={styles.modal} isVisible={visibleModal}></Modal>
      <PhoneAuthImage />
      <TextInput
        maxLength={10}
        style={styles.cellphoneTextInput}
        keyboardType={"number-pad"}
        label="eg. 012 345 6789"
        text={cellphone}
        onChangeText={(text) => setcellphone(text)}
      />

      <BigButton
        disabled={cellphone.length !== 10 || called === true ? true : false}
        onPress={() => {
          StoreData("clientCellNumber", cellphone),
            login({ variables: { cellphone, type: "user" } })
              .then(({ data }) => {
                context.dispatch({
                  type: "SIGN_IN",
                  userToken: data.login.token,
                });
              })
              .catch((e) => {
                console.log(e);
                //Error Handler
              });
        }}
        title={"Sign In"}
      />
    </View>
  );
};
export default PhoneAuth;
