import React, { useState, lazy, Suspense } from "react";
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
import { RFValue } from "react-native-responsive-fontsize";
import InputField from "../Components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextConsumer } from "../Context";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const GET_PROFILE = gql`
  query getProfile {
    currentUser {
      id
    }
  }
`;

const BigButton = lazy(() => import("../Components/Buttons"));
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ProfileStack = (props) => {
  const { loading, error, data } = useQuery(GET_PROFILE);
  /*   if (loading) return null;
  if (error) return `Error! ${error}`; */
  console.log(data);
  const [UserNameText, setUserNameText] = React.useState("");
  const [clientCellNumber, setclientCellNumber] = React.useState("");
  const [clientFirstName, setclientFirstName] = React.useState("");
  const [clientLastName, setclientLastName] = React.useState("");
  const [clientEmail, setclientEmail] = React.useState("");
  const AysncLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <View
      style={{ flexDirection: "column", justifyContent: "center", flex: 1 }}
    >
      <StatusBar translucent={false} style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: wp(100), height: hp(100) }}
      >
        <View
          style={{
            width: wp(100),
            height: hp(15),
          }}
        >
          {/* <Image
            blurRadius={5}
            source={require("./assets/lad.jpg")}
            style={{ flex: 1 }}
          /> */
          /* <Avatar
            rounded
            size="xlarge"
            containerStyle={{
              height: hp(20),
              width: hp(20),
              borderRadius: hp(10),
              position: "absolute",
              top: hp(2),
              marginLeft: wp(10),
              bottom: 0,
            }}
            avatarStyle={{}}
            source={require("./assets/lad.jpg")}
          /> */}

          <TouchableOpacity
            style={{ position: "absolute", right: wp(3), bottom: hp(1) }}
          ></TouchableOpacity>
        </View>

        <View
          style={{
            width: windowWidth,
            height: windowHeight - hp(50),
            marginTop: hp(8),
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              width: wp(80),
              height: hp(6),
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <InputField
              style={[styles.inputStyle, { width: wp(35) }]}
              keyboardType={"default"}
              label={clientFirstName}
              text={UserNameText}
              onChangeText={(text) => setUserNameText(text)}
            />
            <InputField
              style={[styles.inputStyle, { width: wp(35) }]}
              keyboardType={"default"}
              label={clientLastName}
              text={UserNameText}
              onChangeText={(text) => setUserNameText(text)}
            />
          </View>
          <InputField
            style={styles.inputStyle}
            keyboardType={"phone-pad"}
            label={clientCellNumber}
            onChangeText={(text) => setclientCellNumber(text)}
          />
          <InputField
            style={styles.inputStyle}
            keyboardType={"email-address"}
            label={clientEmail}
            text={UserNameText}
            onChangeText={(text) => setUserNameText(text)}
          />
          <InputField
            style={styles.inputStyle}
            keyboardType={"default"}
            label={"Home Address"}
            text={UserNameText}
            onChangeText={(text) => setUserNameText(text)}
          />
          <InputField
            style={styles.inputStyle}
            keyboardType={"default"}
            label={"Work Address"}
            text={UserNameText}
            onChangeText={(text) => setUserNameText(text)}
          />
        </View>
        <View
          style={{
            alignSelf: "stretch",
            alignItems: "stretch",
            height: hp(12),
            justifyContent: "center",
          }}
        >
          <BigButton
            title={"Update"}
            buttonStyle={{
              alignSelf: "center",
              flex: 1,
            }}
          />
        </View>
        <View
          style={{
            borderTopWidth: wp(1),
            borderTopColor: "#6c63ff",
            backgroundColor: "#f5f5f5",
            width: wp(100),
            height: hp(8),
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{ marginLeft: wp(5), fontSize: wp(5), alignSelf: "center" }}
          >
            Logout
          </Text>
          <ContextConsumer>
            {(context) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    {
                      AysncLogout(), context.dispatch({ type: "SIGN_OUT" });
                    }
                  }}
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",

                    flexDirection: "row",
                    width: wp(10),
                    marginRight: wp(5),
                    height: hp(5),
                  }}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              );
            }}
          </ContextConsumer>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(80),
    height: hp(6),
    fontSize: RFValue(13),
  },
});

export default ProfileStack;
