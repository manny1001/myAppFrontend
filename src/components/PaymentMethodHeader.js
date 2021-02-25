import { React, View, HeadingText, MethodPicker } from "../api/constants";

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
