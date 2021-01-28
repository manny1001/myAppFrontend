import React, { lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import { ContextConsumer } from "../Context";
import { GET_NEW_DRIVER } from "../Queries";
import { useMutation } from "@apollo/client";
const Driver = lazy(() => import("../Components/SelectDriver"));
const BigButton = lazy(() => import("../Components/Buttons"));

const SelectNewDriver = ({ totalAmount }) => {
  const [updateDriver, { error, loading }] = useMutation(GET_NEW_DRIVER);
  console.log(updateDriver, error, loading);
  if (loading) return <Text>Loading</Text>;
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
                  }),
                    newTripRequest({
                      variables: {
                        uuidDriver: context.state.driveruuid,
                        uuidUser: context.state.useruuid,
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

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
});

//make this component available to the app
export default SelectNewDriver;
