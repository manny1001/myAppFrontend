import React, { Component, lazy } from "react";
import { View, Text, TouchableOpacity, Button, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const SelectedPaymentMethod = ({ onCardPress, onCashPress }) => {
  return (
    <>
      <TouchableOpacity
        onPress={onCardPress}
        style={{
          position: "absolute",
          zIndex: 100,
          top: hp(52),
          left: wp(25),
        }}
      >
        <Text
          style={{
            fontSize: RFValue(18),
            fontWeight: "500",
          }}
        >
          Card
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCashPress}
        style={{
          position: "absolute",
          zIndex: 100,
          top: hp(52),
          right: wp(30),
        }}
      >
        <Text
          style={{
            fontSize: RFValue(18),
            fontWeight: "500",
          }}
        >
          Cash
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default SelectedPaymentMethod;
