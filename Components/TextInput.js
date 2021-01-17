import React from "react";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const Input = ({ containerStyle, style, label, text }) => (
  <TextInput
    containerStyle={{
      flexDirection: "row",
      marginLeft: wp(10),
      marginRight: wp(10),
    }}
    style={style}
    flat
    label={label}
    value={text}
    onChangeText={(text) => setText(text)}
  />
);

export default TextInput;
