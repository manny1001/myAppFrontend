import React, { lazy } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
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
          <GooglePlacesAutocomplete
            keyboardShouldPersistTaps={true}
            listViewDisplayed={false}
            fetchDetails={true}
            placeholder="Enter location..."
            onPress={(data) => {
              setisClicked();
              setCurrentLocation();
              dispatchSaveLocation(data);
            }}
            query={{
              key: "AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM",
              language: "en",
            }}
            requestUrl={{
              useOnPlatform: "web",
              url:
                "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
            }}
            debounce={200}
            styles={{
              container: {
                width: wp(60),
                alignSelf: "center",
                marginLeft: wp(5),
              },
              textInputContainer: {
                width: wp(60),
                backgroundColor: "transparent",
                borderColor: null,
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                height: hp(5),
                color: "#5d5d5d",
                fontSize: 16,
              },
            }}
          />
        )}
      </View>
    </View>
  );
};

export default PickUpLocation;
