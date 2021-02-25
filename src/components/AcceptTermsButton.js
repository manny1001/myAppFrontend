import { React, TouchableOpacity, View, wp } from "../api/constants";

const AcceptTermsButton = ({ onPress, isAccepted }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: wp(7),
          height: wp(7),
          borderWidth: 3,
          backgroundColor: isAccepted ? "black" : null,
        }}
      ></View>
    </TouchableOpacity>
  );
};
export default AcceptTermsButton;
