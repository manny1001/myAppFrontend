import { React, TouchableOpacity, Text, wp, styles } from "../api/constants";

const CallDriver = () => {
  return (
    <TouchableOpacity
      style={[
        styles.TopInfo,
        {
          borderWidth: wp(1),
          height: wp(9),
          alignSelf: "center",
          borderRadius: wp(4),
          borderColor: "green",
          backgroundColor: "#f2f2f2",
        },
      ]}
    >
      <Text
        style={{ fontFamily: "Gotham_Medium_Regular", alignSelf: "center" }}
      >
        Call driver
      </Text>
    </TouchableOpacity>
  );
};

export default CallDriver;
