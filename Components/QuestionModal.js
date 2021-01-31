//import liraries
import React, { Component, lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
const BigButton = lazy(() => import("../Components/Buttons"));
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
const QuestionModal = ({ setYes, setNo }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: wp(80), bottom: hp(10) }}>
        <Text
          style={{
            fontSize: RFPercentage(5),
            alignSelf: "center",
          }}
        >
          Has your driver arrived?
        </Text>
      </View>

      <BigButton
        title={"Yes"}
        onPress={() => {
          setYes();
        }}
        titleStyle={{
          fontWeight: "bold",
          fontSize: RFPercentage(3),
        }}
        buttonStyle={{
          height: hp(10),
          width: wp(80),
          alignSelf: "center",
        }}
      />
      <BigButton
        background={"NONE"}
        title={"No"}
        onPress={() => {
          setNo();
        }}
        titleStyle={{
          color: "#6c63ff",
          fontWeight: "bold",
          fontSize: RFPercentage(2),
        }}
        buttonStyle={{
          height: hp(10),
          width: wp(80),
          alignSelf: "center",
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
});

//make this component available to the app
export default QuestionModal;
