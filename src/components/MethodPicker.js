import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Picker } from "@react-native-picker/picker";

const MethodPicker = ({ onValueChange, selectedValue }) => {
  return (
    <Picker
      mode={"dropdown"}
      selectedValue={selectedValue}
      style={{
        height: hp(4),
        width: wp(20),
        borderRadius: wp(3),
        borderWidth: wp(0.3),
        justifyContent: "center",
        marginLeft: wp(2),
        marginTop: hp(0.75),
        backgroundColor: "#f5f5f5",
      }}
      onValueChange={onValueChange}
    >
      <Picker.Item label="Select" value="Select" />
      <Picker.Item label="Cash" value="Cash" />
      <Picker.Item label="Card" value="Card" />
    </Picker>
  );
};
export default MethodPicker;
