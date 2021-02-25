import { React, View, Text, wp, hp } from "../api/constants";

const PhoneAuthImage = () => {
  return (
    <View
      style={{
        width: wp(90),
        height: hp(60),
        alignSelf: "center",
        borderWidth: wp(0.5),
        justifyContent: "center",
      }}
    >
      <Text style={{ alignSelf: "center" }}>Image</Text>
    </View>
  );
};

export default PhoneAuthImage;
