import { React, Text, RFValue } from "../api/constants";

const HeadingText = ({ selectedValue }) => {
  switch (selectedValue) {
    case "Select":
      return (
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(24),
            fontWeight: "600",
          }}
        >
          Method
        </Text>
      );

    default:
      return (
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFValue(24),
            fontWeight: "600",
          }}
        >
          Method
        </Text>
      );
  }
};

export default HeadingText;
