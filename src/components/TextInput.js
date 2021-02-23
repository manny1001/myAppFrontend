import React from "react";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const Input = ({
  containerStyle,
  style,
  label,
  defaultValue,
  onChangeText,
}) => (
  <TextInput
    mode={"outlined"}
    style={style}
    onChangeText={onChangeText}
    selectionColor={"blue"}
  />
);

export default TextInput;
