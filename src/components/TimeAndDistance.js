import { React, View, Text, styles } from "../api/constants";

const TimeAndDistance = ({ time, distance }) => {
  return (
    <View style={styles.timeAndDistanceContainer}>
      <Text
        style={{
          fontFamily: "Gotham_Medium_Regular",
          alignSelf: "center",
        }}
      >
        {time} 15 mins and {distance}10 km to destination.
      </Text>
    </View>
  );
};

export default TimeAndDistance;
