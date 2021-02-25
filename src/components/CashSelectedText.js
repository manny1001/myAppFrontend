import { React, Text, wp } from "../api/constants";

const CashSelectedText = ({ text }) => {
  return (
    <Text
      style={{
        width: wp(85),
        alignSelf: "center",
      }}
    >
      {text}
    </Text>
  );
};

export default CashSelectedText;
