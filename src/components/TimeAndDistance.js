import { React, View, Text, styles } from "../api/constants";

const TimeAndDistance = ({ time, distance }) => {
  return (
    <View style={styles.timeAndDistanceContainer}>
      <Text
        style={{
          alignSelf: "center",
        }}
      >
        {time}
        <Text
          style={{
            fontFamily: "Gotham_Medium_Regular",
            alignSelf: "center",
          }}
        >
          15
        </Text>
        mins and{" "}
        <Text
          style={{
            fontFamily: "Gotham_Medium_Regular",
            alignSelf: "center",
          }}
        >
          10 km
        </Text>
        {distance} to destination.
      </Text>
    </View>
  );
};

export default TimeAndDistance;
