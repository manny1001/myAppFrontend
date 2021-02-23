//import liraries
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
import { RFValue } from "react-native-responsive-fontsize";
import styles from "../styles/styles";
import BigButton from "../components/Buttons";
import { ContextConsumer } from "../../src/context/Context";
const SettingsPresentational = ({ props, DATA }) => {
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
      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              title={"Sign out"}
              onPress={() => {
                {
                  AysncLogout(), context.dispatch({ type: "SIGN_OUT" });
                }
              }}
            />
          );
        }}
      </ContextConsumer>
    </View>
  );
};

export default SettingsPresentational;