import { React, View, Text, styles, Button } from "../api/constants";

const PaymentSuccessful = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          width: 400,
          alignSelf: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "Gotham_Medium_Regular",
          marginBottom: 100,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Payment successful, please proceeed to track your driver...
      </Text>
      <Button
        onPress={() => {
          stopPolling(),
            StopPolling(),
            props.props.navigation.navigate("TrackDriver");
        }}
        title={"Next"}
      />
    </View>
  );
};

export default PaymentSuccessful;
