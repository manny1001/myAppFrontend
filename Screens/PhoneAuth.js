import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import InputField from "../Components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as yup from "yup";
import { RFValue } from "react-native-responsive-fontsize";
import EnterOTP from "../screens/EnterOTP";
import Modal from "modal-enhanced-react-native-web";
import { ContextConsumer } from "../Context";
import BigButton from "../Components/Buttons";

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
        height: hp(100),
        width: wp(100),
      }}
    >
      <StatusBar style="light" translucent={false} />
      <Modal
        style={{
          height: hp(100),
          width: wp(100),
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
            {/* <MaterialIcons
              name="error"
              size={wp(30)}
              color="red"
              style={{ alignSelf: "center" }}
            /> */}
            <Text
              style={{
                alignSelf: "center",
                color: "black",
                fontWeight: "800",
                fontSize: RFValue(16),
                marginTop: hp(5),
              }}
            >
              Incorrect OTP,Please try again.
            </Text>
          </View>
        )}
      </Modal>
      <Formik
        onSubmit={(values) => handleSubmit}
        initialValues={{ email: "", password: "" }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View
            style={{
              height: hp(100),
              weight: wp(100),

              justifyContent: "space-around",
            }}
          >
            <Image
              style={{
                alignSelf: "center",
                flex: 1,
                width: wp("80%"),
                resizeMode: "contain",
              }}
              source={require("../assets/lady.png")}
            />
            <View
              style={[
                {
                  justifyContent: "center",

                  width: "70%",
                  marginBottom: hp(5),
                  alignSelf: "center",
                  height: hp(10),
                },
              ]}
            >
              <View
                style={{
                  width: wp(60),

                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    position: "absolute",
                    top: hp(-3),
                    color: "gray",
                  }}
                ></Text>

                <InputField
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

              {touched.email && errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}
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
                    containerStyle={{
                      height: hp(15),
                      justifyContent: "center",
                    }}
                    title={"Sign In"}
                    buttonStyle={{
                      height: hp(10),
                      width: wp(80),
                      alignSelf: "center",
                    }}
                  />
                );
              }}
            </ContextConsumer>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default PhoneAuth;
