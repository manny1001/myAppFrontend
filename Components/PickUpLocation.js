import React, { lazy, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text, ActivityIndicator } from "react-native";
import { ContextConsumer } from "../Context";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GoogleAutoComplete = lazy(() =>
  import("../Components/GoogleAutoComplete")
);
const PickUpLocation = ({
  isClicked,
  setisClicked,
  setCurrentLocation,
  dispatchSaveLocation,
}) => {
  const [departure, setdeparture] = useState(null);
  const getData = async (Key) => {
    try {
      const value = await AsyncStorage.getItem(Key);
      if (value !== null) {
        setdeparture(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  getData("pickuplocation");
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Text style={{ fontSize: RFPercentage(3) }}>Pickup</Text>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {isClicked === false ? (
                context.state.departure === "" ? (
                  <View
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ alignSelf: "center" }}>
                      Getting Location
                    </Text>
                    <ActivityIndicator
                      size="small"
                      style={{ alignSelf: "center" }}
                      color={"green"}
                    />
                  </View>
                ) : (
                  <Text
                    numberOfLines={3}
                    style={{
                      alignSelf: "center",

                      fontSize: RFValue(14),
                    }}
                  >
                    {departure !== null ? departure : context.state.departure}
                  </Text>
                )
              ) : (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  setSelected={(val) => {}}
                />
              )}
            </View>
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default PickUpLocation;
