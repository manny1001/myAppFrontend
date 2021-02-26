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
          backgroundColor: null,
        },
      ]}
    >
      <Text
        style={{
          alignSelf: "center",
          color: "#EF4C63",
        }}
      >
        Call driver
      </Text>
    </TouchableOpacity>
  );
};

export default CallDriver;
