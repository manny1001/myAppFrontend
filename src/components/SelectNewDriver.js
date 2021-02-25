import {
  React,
  View,
  Text,
  wp,
  RFValue,
  RFPercentage,
  ContextConsumer,
  GET_NEW_DRIVER,
  useMutation,
  GetData,
  Driver,
  BigButton,
  styles,
} from "../api/constants";

const SelectNewDriver = ({ totalAmount, navigation }) => {
  const [updateDriver, { error }] = useMutation(GET_NEW_DRIVER);
  if (error) return <Text>{error.message}</Text>;
  const [useruuid, setuseruuid] = React.useState("");
  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: wp(100),
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            width: wp(80),
            fontSize: RFPercentage(4),
            fontWeight: "400",
          }}
        >
          Sorry, seems like the driver isn't available, please choose another
          driver, Thanks.
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            fontSize: RFValue(16),
            fontWeight: "bold",
          }}
        >
          Driver
        </Text>
        <Driver />
      </View>
      <View
        style={{
          flex: 0.25,
          width: wp(100),
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <ContextConsumer>
          {(context) => {
            return (
              <BigButton
                disabled={context.state.driveruuid === "" ? true : false}
                buttonStyle={{
                  width: wp(80),
                  alignSelf: "center",
                }}
                titleStyle={{ fontWeight: "bold" }}
                title={"Proceed" + " " + "\n" + "R" + " " + totalAmount}
                onPress={() => {
                  navigation.navigate("Payment", {
                    totalAmount: totalAmount,
                  });
                  updateDriver({
                    variables: {
                      driveruuid: context.state.driveruuid,
                      useruuid: useruuid,
                    },
                  });
                }}
              />
            );
          }}
        </ContextConsumer>
      </View>
    </View>
  );
};

export default SelectNewDriver;
