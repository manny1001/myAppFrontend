import { React, View, Text, styles, RFPercentage } from "../api/constants";

const DriversInfo = ({ DriverName, DriverCarModel, DriverRegistration }) => {
  return (
    <View style={styles.TopInfo}>
      <Text
        style={{
          alignSelf: "center",
          flexDirection: "column",
          fontSize: RFPercentage(2),
        }}
      >
        {DriverName}
      </Text>
      <Text
        style={{
          alignSelf: "center",
          flexDirection: "column",
          fontSize: RFPercentage(2),
        }}
      >
        {DriverCarModel}
      </Text>
      <Text
        style={{
          fontSize: RFPercentage(2),
          alignSelf: "center",
          fontWeight: "700",
        }}
      >
        {DriverRegistration}
      </Text>
    </View>
  );
};

export default DriversInfo;
