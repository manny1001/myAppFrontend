import { React, View, Text, styles } from "../api/constants";

const TimeAndDistance = ({ time, distance }) => {
  return (
    <View style={styles.timeAndDistanceContainer}>
      <Text>
        {time}
        <Text>15 </Text>
        mins and <Text>10 </Text>km
        {distance} to destination.
      </Text>
    </View>
  );
};

export default TimeAndDistance;
