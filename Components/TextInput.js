import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

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
