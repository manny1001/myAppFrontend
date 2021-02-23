//import liraries
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SwitchPaymentTypeButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 20,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          alignSelf: "center",
        }}
      >
        Switch to {text} payment
      </Text>
    </TouchableOpacity>
  );
};

export default SwitchPaymentTypeButton;
