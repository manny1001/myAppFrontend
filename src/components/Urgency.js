import { React, TouchableOpacity, Text, View, styles } from "../api/constants/";
const Urgency = () => {
  const [isFocused, setisFocused] = React.useState("green");
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-evenly",
        margin: 5,
      }}
    >
      <TouchableOpacity onFocus={() => setisFocused("green")}>
        <Text
          style={[
            styles.urgencyButton,
            {
              borderColor: isFocused === "green" ? "black" : "#f4f4f4",
            },
          ]}
        >
          I'M CHILLED
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onFocus={() => setisFocused("blue")}>
        <Text
          style={[
            styles.urgencyButton,
            {
              borderColor: isFocused === "blue" ? "black" : "#f4f4f4",
            },
          ]}
        >
          KINDA RUSHING
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onFocus={() => setisFocused("red")}>
        <Text
          style={[
            styles.urgencyButton,
            {
              borderColor: isFocused === "red" ? "black" : "#f4f4f4",
            },
          ]}
        >
          I'M LATE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Urgency;
