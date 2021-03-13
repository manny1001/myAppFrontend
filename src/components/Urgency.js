import {
  React,
  TouchableOpacity,
  Text,
  View,
  styles,
  wp,
  hp,
} from "../api/constants/";
const Urgency = ({ setUrgency }) => {
  const [isFocused, setisFocused] = React.useState(null);
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        justifyContent: "space-around",
        height: hp(5),
        marginBottom: hp(3),
      }}
    >
      <TouchableOpacity
        style={styles.urgencyButton}
        onFocus={() => {
          setisFocused("green"), setUrgency("Chilled");
        }}
      >
        <Text
          color={isFocused === "green" ? "white" : "#d3d3d3"}
          style={[
            styles.urgencyText,
            {
              shadowColor: "white",
              shadowRadius: isFocused === "green" ? 10 : 5,
              shadowOpacity: isFocused === "green" ? 0.7 : 0.3,
              borderColor: isFocused === "green" ? "#f4f4f4" : null,
              borderWidth: isFocused === "green" ? wp(0.5) : null,
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
          color={isFocused === "blue" ? "white" : "#d3d3d3"}
          style={[
            styles.urgencyText,
            {
              shadowColor: "white",
              shadowRadius: isFocused === "blue" ? 10 : 5,
              shadowOpacity: isFocused === "blue" ? 0.7 : 0.3,
              borderColor: isFocused === "blue" ? "#f4f4f4" : null,
              borderWidth: isFocused === "blue" ? wp(0.5) : null,
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
          color={isFocused === "red" ? "white" : "#d3d3d3"}
          style={[
            styles.urgencyText,
            {
              shadowColor: "white",
              shadowRadius: isFocused === "red" ? 10 : 5,
              shadowOpacity: isFocused === "red" ? 0.7 : 0.3,
              borderColor: isFocused === "red" ? "#f4f4f4" : null,
              borderWidth: isFocused === "red" ? wp(0.5) : null,
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
