import { React, TouchableOpacity, Text, View, styles } from "../api/constants/";
const Urgency = ({ setUrgency }) => {
  const [isFocused, setisFocused] = React.useState("green");
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-around",
        margin: 5,
      }}
    >
      <TouchableOpacity
        style={styles.urgencyButton}
        onFocus={() => {
          setisFocused("green"), setUrgency("Chilled");
        }}
      >
        <Text
          style={[
            styles.urgencyText,
            {
              borderColor: isFocused === "green" ? "black" : "#f4f4f4",
            },
          ]}
        >
          CHILLED
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.urgencyButton}
        onFocus={() => {
          setisFocused("blue"), setUrgency("Rushing");
        }}
      >
        <Text
          style={[
            styles.urgencyText,
            {
              borderColor: isFocused === "blue" ? "black" : "#f4f4f4",
            },
          ]}
        >
          RUSHING
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.urgencyButton}
        onFocus={() => {
          setisFocused("red"), setUrgency("Late");
        }}
      >
        <Text
          style={[
            styles.urgencyText,
            {
              borderColor: isFocused === "red" ? "black" : "#f4f4f4",
            },
          ]}
        >
          LATE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Urgency;
