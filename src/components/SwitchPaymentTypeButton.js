import { React, Text, TouchableOpacity } from "../api/constants";

const SwitchPaymentTypeButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#EDCD42",
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
