import { React, View, Text, styles, RFPercentage } from "../api/constants";

const DriversInfo = ({ DriverName, DriverCarModel, DriverRegistration }) => {
  return (
    <View
      style={[
        styles.TopInfo,
        {
          backgroundColor: null,
        },
      ]}
    >
      <Text
        style={{
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        {DriverName}
      </Text>
      <Text
        style={{
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        {DriverCarModel}
      </Text>
      <Text
        style={{
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
