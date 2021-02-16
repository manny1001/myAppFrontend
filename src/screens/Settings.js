import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextConsumer } from "../../src/context/Context";
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../styles/styles";
const AysncLogout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    return true;
  } catch (e) {
    return false;
  }
};
const Usersettings = (props) => {
  const DATA = [
    /* {
      id: "1",
      icon: <View style={styles.iconStyle}></View>,
      title: "Notifications",
    }, */
    {
      id: "2",
      icon: <View style={styles.iconStyle}></View>,
      title: "Feedback",
    },
    {
      id: "3",
      icon: <View style={styles.iconStyle}></View>,
      title: "About",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        containerStyle={{
          flex: 1,
          alignSelf: "center",
        }}
        style={{}}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              item.id === "2" && props.navigation.navigate("Feedback");
              item.id === "3" && props.navigation.navigate("About");
            }}
            style={{
              borderBottomWidth: 0.1,
              borderBottomColor: "#d3d3d3",
              flexDirection: "row",
              flex: 1,
              height: hp(8),
              padding: 20,
            }}
          >
            {item.icon}
            <Text
              style={{
                fontSize: RFValue(18),
                fontWeight: "400",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          borderTopWidth: 0.1,
          borderTopColor: "#d3d3d3",
          height: hp(8),
          justifyContent: "space-between",
          flexDirection: "row",
          alignSelf: "stretch",
        }}
      >
        <Text
          style={{
            fontSize: wp(5),
            alignSelf: "center",
          }}
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
                  alignSelf: "center",
                }}
              >
                <Text>Logout</Text>
              </TouchableOpacity>
            );
          }}
        </ContextConsumer>
      </View>
    </View>
  );
};

export default Usersettings;
