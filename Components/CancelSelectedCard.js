import React, { Component, lazy } from "react";
import { Text, TouchableOpacity, Button, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";

const CancelSelectedCard = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: "absolute",
        top: hp(28),
        marginLeft: wp(85),
      }}
    >
      <MaterialIcons name="cancel" size={wp(10)} color="black" />
      <Text style={{ alignSelf: "center", fontWeight: "bold" }}>No</Text>
    </TouchableOpacity>
  );
};

export default CancelSelectedCard;
