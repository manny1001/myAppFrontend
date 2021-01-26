//import liraries
import React, { lazy, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ContextConsumer } from "../Context";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
const GoogleAutoComplete = lazy(() =>
  import("../Components/GoogleAutoComplete")
);
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PrevLocations } from "../DATA";
const Destination = ({
  setDestination,
  DestinationSelected,
  setDestinationSelected,
  setsavedLocationVisible,
}) => {
  const [destination, setdestination] = useState(null);
  const GetData = async (Key) => {
    try {
      const value = await AsyncStorage.getItem(Key);
      if (value !== null) {
        setdestination(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  GetData("destination");
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
                    placeholder={"where would you like to go?"}
                    setAddress={(val) => setDestination(val)}
                  />

                  {PrevLocations.length !== 0 && (
                    <TouchableOpacity
                      onPress={setsavedLocationVisible}
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        flexDirection: "row",
                        height: hp(5),
                        marginBottom: hp(3),
                        marginRight: wp(1),
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color: "blue",
                          fontWeight: "bold",
                          fontSize: RFValue(12),
                        }}
                      >
                        Recent
                      </Text>
                    </TouchableOpacity>
                  )}
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
