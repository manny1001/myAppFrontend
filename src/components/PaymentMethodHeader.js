//import liraries
import React, { lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
const HeadingText = lazy(() => import("../../src/components/HeadingText"));
const MethodPicker = lazy(() => import("./MethodPicker"));
const PaymentMethodHeader = ({ selectedValue, onValueChange }) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <HeadingText selectedValue={selectedValue} />
      {selectedValue !== "Select" && (
        <MethodPicker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
        />
      )}
    </View>
  );
};

export default PaymentMethodHeader;