//import liraries
import React, { lazy, Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ContextConsumer } from "..//context/Context";
import { RFValue } from "react-native-responsive-fontsize";

import styles from "../styles/styles";
const AddName = lazy(() => import("../../src/screens/AddName"));
const BigButton = lazy(() => import("../../src/components/Buttons"));
const Driver = lazy(() => import("../components/SelectDriver"));
const ConfrimPresentational = ({
  destination,
  location,
  error,
  DATA,
  stopPolling,
  newTripRequest,
  data,
  navigation,
  called,
}) => {
  const [personalDriver, setPersonalDriver] = React.useState(null);
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View
            style={[
              styles.container,
              { justifyContent: "space-between", flex: 1 },
            ]}
          >
            <Text style={styles.heading2}>Departure</Text>
            <Text style={styles.locations}>{location}</Text>
            <Text style={styles.heading2}>Destination</Text>
            <Text style={styles.locations}>{destination}</Text>

            {context.state.totalDriversOnline !== 0 && (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontWeight: "bold",
                    fontFamily: "Gotham_Medium_Regular",
                  }}
                >
                  {context.state.driveruuid === "" ? `Available Drivers` : ""}
                </Text>
                {context.state.driveruuid === "" ? (
                  <Text
                    style={{
                      fontSize: RFPercentage(2.5),
                      marginLeft: wp(5),
                      fontWeight: "bold",
                      fontFamily: "Gotham_Medium_Regular",
                    }}
                  >
                    {context.state.totalDriversOnline}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      context.dispatch({
                        type: "SAVE_DRIVERUUID",
                        driveruuid: "",
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(18),
                        fontWeight: "bold",
                        fontFamily: "Gotham_Medium_Regular",
                      }}
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <Driver context={context} error={error} data={DATA} />

            {context.state.driveruuid !== "" && personalDriver === null && (
              <TouchableOpacity
                onPress={() => setPersonalDriver("javssa")}
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-evenly",
                  margin: 5,
                  borderWidth: 2,
                  backgroundColor: personalDriver !== null && "black",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: personalDriver !== null && "white",
                    alignSelf: "stretch",
                    width: "90",
                  }}
                >
                  Make personal driver
                </Text>
              </TouchableOpacity>
            )}
            {context.state.driveruuid !== "" && personalDriver !== null && (
              <TouchableOpacity
                onPress={() => setPersonalDriver(null)}
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-evenly",
                  margin: 5,
                  borderWidth: 2,
                  backgroundColor: personalDriver !== null && "black",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: personalDriver !== null && "white",
                    alignSelf: "stretch",
                    width: "90",
                  }}
                >
                  Remove personal driver
                </Text>
              </TouchableOpacity>
            )}

            <BigButton
              disabled={
                context.state.driveruuid === "" || called === true
                  ? true
                  : false
              }
              title={"Next"}
              onPress={() => {
                stopPolling(), console.log(navigation);
                newTripRequest({
                  variables: {
                    uuid: data && data.currentUser.uuid,
                    name: data && data.currentUser.name,
                    cellphone: data && data.currentUser.cellphone,
                    location: location,
                    destination: destination,
                    uuidDriver: context.state.driveruuid,
                  },
                });
                navigation.navigate("Payment");
              }}
            />
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default ConfrimPresentational;
