import React, { lazy } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
const GoogleAutoComplete = lazy(() =>
  import("../Components/GoogleAutoComplete")
);
const PickUpLocation = ({
  isClicked,
  setisClicked,
  currentLocation,
  setCurrentLocation,
  dispatchSaveLocation,
}) => {
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
          currentLocation === "" ? (
            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <Text style={{ alignSelf: "center" }}>Getting Location</Text>
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
              {currentLocation}
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
};

export default PickUpLocation;
