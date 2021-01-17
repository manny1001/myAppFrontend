import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FlatListSettings from "../Components/FlatListSettings";
import Header from "../Components/Header";
import { RFValue } from "react-native-responsive-fontsize";

const CardSettings = (props) => {
  const DATA = [
    {
      id: "1",
      title: "Add",
      description: "If you have a new card you would like to link.",
    },
    {
      id: "2",
      title: "Edit",
      description: "Have details of a card changed?",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatListSettings
        DATA={DATA}
        onPress1={() => props.navigation.navigate("AddBankCard")}
        onPress2={() => props.navigation.navigate("EditBankcard")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CardSettings;
