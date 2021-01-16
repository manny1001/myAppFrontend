import React, { useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import InputField from "../Components/TextInput";
import { ContextConsumer } from "../Context";
import BigButton from "../Components/Buttons.js";
import Header from "../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const AddNames = (props) => {
  const [UserEmail, setUserEmail] = React.useState(null);

  return (
    <>
      <Header
        backColor={"transparent"}
        CenterComponent={
          <>
            <Text style={{ fontSize: RFValue(20) }}>Add Email</Text>
            <Text
              style={{
                alignSelf: "center",
                fontSize: RFValue(12),
              }}
            >
              Add an email address to confirm your identity.
            </Text>
          </>
        }
      />
      <StatusBar translucent={false} style="light" />

      <ScrollView
        style={{
          width: wp(100),
          height: hp(100),
        }}
      >
        <View
          style={{
            width: windowWidth,
            height: windowHeight - hp(50),
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <InputField
            style={[styles.inputStyle, { width: wp(80) }]}
            keyboardType={"default"}
            label={"Email address"}
            text={UserEmail}
            onChangeText={(text) => {
              {
                text === "" && setUserEmail(null);
              }

              {
                text !== "" && setUserEmail(text);
              }
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("PhoneAuth")}
          style={{ marginBottom: hp(5) }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: RFValue(12),
              color: "blue",
            }}
          >
            Skip , Add email later
          </Text>
        </TouchableOpacity>
        <ContextConsumer>
          {(context) => {
            return (
              <BigButton
                onPress={() => {
                  context.dispatch({ type: "SAVE_EMAIL", payload: UserEmail });
                  props.navigation.navigate("PhoneAuth");
                  AsyncStorage.setItem("isFirstTime", "true");
                }}
                disabled={UserEmail === null ? true : null}
                title={"Save"}
                buttonStyle={{
                  height: hp(10),
                  width: wp(80),
                  alignSelf: "center",
                }}
              />
            );
          }}
        </ContextConsumer>
      </ScrollView>
    </>
  );
};

export default AddNames;
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(80),
    height: hp(6),
    fontSize: RFValue(13),
    marginTop: hp(10),
  },
});
