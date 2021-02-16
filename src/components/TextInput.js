import React from "react";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const Input = ({ containerStyle, style, label, text }) => (
  <TextInput
    containerStyle={containerStyle}
    style={style}
    label={label}
    onChangeText={(text) => setText(text)}
  />
);

export default TextInput;
