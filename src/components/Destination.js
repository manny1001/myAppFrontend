//import liraries
import React, { lazy } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
const GoogleAutoComplete = lazy(() => import("./GoogleAutoComplete"));
import { ContextConsumer } from "../../src/context/Context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Destination = ({
  getTripInfo,
  destination,
  setDestination,
  DestinationSelected,
  setDestinationSelected,
}) => {
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View
            style={{
              height: hp(15),
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              alignSelf: "stretch",
            }}
          >
            <Text style={{ fontSize: RFPercentage(3) }}>Destination</Text>

            <View
              style={{
                height: hp(10),
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {DestinationSelected === false ? (
                <>
                  <GoogleAutoComplete
                    destination={destination}
                    placeholder={"where would you like to go?"}
                    setAddress={(val) => setDestination(val)}
                    dispatchAddress={(data) => {
                      context.dispatch({
                        type: "SAVE_DESTINATION",
                        destination: data,
                      });
                    }}
                    setSelected={setDestinationSelected}
                    getTripInfo={getTripInfo}
                  />
                </>
              ) : (
                <Text
                  numberOfLines={3}
                  style={{
                    width: wp(55),
                    alignSelf: "center",

                    fontSize: RFValue(14),
                  }}
                >
                  {destination !== null
                    ? destination
                    : context.state.destination}
                </Text>
              )}
              {DestinationSelected === true && (
                <TouchableOpacity
                  onPress={() => {
                    {
                      this.setState({ DestinationSelected: false }),
                        this.setState({ destination: "" }),
                        this.setState({ value: null });
                    }
                  }}
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                ></TouchableOpacity>
              )}
            </View>
          </View>
        );
      }}
    </ContextConsumer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default Destination;
