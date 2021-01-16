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
import { RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const AddNames = (props) => {
  const [UserFirstName, setUserFirstName] = React.useState(null);
  const [UserLastName, setUserLastName] = React.useState(null);

  return (
    <>
      <Header
        backColor={"transparent"}
        CenterComponent={
          <Text style={{ fontSize: RFValue(20) }}>Add Names</Text>
        }
      />
      <StatusBar translucent={false} style="light" />
      <Text
        style={{ alignSelf: "center", fontSize: RFValue(12), width: wp(80) }}
      >
        Add your names so we know who you are when you place an order or request
        a ride.
      </Text>
      <ScrollView
        style={{
          width: wp(100),
          height: hp(100),
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("PhoneAuth")}
          style={{ marginBottom: hp(5) }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: RFValue(12),
              color: "blue",
              marginTop: hp(5),
            }}
          >
            Already logged in before? Skip
          </Text>
        </TouchableOpacity>
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
            label={"First Name"}
            text={UserFirstName}
            onChangeText={(text) => {
              {
                text === "" && setUserFirstName(null);
              }

              {
                text !== "" && setUserFirstName(text);
              }
            }}
          />
          <InputField
            style={[styles.inputStyle, { width: wp(80) }]}
            keyboardType={"default"}
            label={"Last Name"}
            text={UserLastName}
            onChangeText={(text) => {
              {
                text === "" && setUserLastName(null);
              }

              {
                text !== "" && setUserLastName(text);
              }
            }}
          />
        </View>

        <View
          style={{
            alignSelf: "center",
            height: hp(12),
            justifyContent: "center",
          }}
        >
          <ContextConsumer>
            {(context) => {
              return (
                <BigButton
                  onPress={() => {
                    context.dispatch({
                      type: "SAVE_NAMES",
                      payload: {
                        FirstName: UserFirstName,
                        LastName: UserLastName,
                      },
                    });
                    props.navigation.navigate("AddEmail");
                  }}
                  disabled={
                    UserFirstName === null
                      ? true
                      : UserLastName === null
                      ? true
                      : null
                  }
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
        </View>
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
