import { React, TEXTINPUT } from "../api/constants";

export const Input = ({ style, onChangeText }) => (
  <TEXTINPUT
    mode={"outlined"}
    style={style}
    onChangeText={onChangeText}
    selectionColor={"blue"}
  />
);

export default TEXTINPUT;
