import React, { Component, lazy } from "react";
import { View, Text } from "react-native";
/* import { getTripInfo, getlocation } from "../../src/utilites/utilities"; */
import { ContextConsumer } from "../../Context";
import Geocoder from "react-native-geocoding";
import { useIsFocused } from "@react-navigation/native";
import styles from "../../styles";
import { StoreData } from "../../GFunctions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
const BigButton = lazy(() => import("../../Components/Buttons"));
const PickUpLocation = lazy(() => import("../../Components/PickUpLocation"));
const Destination = lazy(() => import("../../Components/Destination"));

export default function (props) {
  const [currentLocation, setcurrentLocation] = React.useState(
    "0A 2nd Road, Halfway House Estate, Midrand, 1685, South Africa"
  );
  const [destination, setdestination] = React.useState(
    "Carlswald Midrand, South Africa"
  );
  const [errorMsg, seterrorMsg] = React.useState(null);
  const [latitude, setlatitude] = React.useState(null);
  const [longitude, setlongitude] = React.useState(null);
  const [locationSelected, setlocationSelected] = React.useState(false);
  const [distance, setdistance] = React.useState(null);
  const [time, settime] = React.useState(null);
  const [DestinationSelected, setDestinationSelected] = React.useState(true);
  const [isClicked, setisClicked] = React.useState(false);

  const setCurrentLocationHandler = (val) => {
    setcurrentLocation(val);
  };

  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-evenly",
              }}
            >
              <PickUpLocation
                setIsClicked={() => setIsClicked(!isClicked)}
                isClicked={isClicked}
                setLocationSelected={() => setlocationSelected(true)}
                locationSelected={locationSelected}
                currentLocation={currentLocation}
                setCurrentLocation={() => setCurrentLocationHandler()}
                getTripInfo={() => getTripInfo()}
              />
              {location !== null && destination !== null && (
                <>
                  <View
                    style={{
                      justifyContent: "space-between",
                      width: wp(55),
                      alignSelf: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ alignSelf: "center" }}>{time}</Text>
                    <Text style={{ alignSelf: "center" }}>{distance}</Text>
                  </View>
                  <Text style={{ alignSelf: "center" }}>
                    time and distance to destination
                  </Text>
                </>
              )}

              <Destination
                setsavedLocationVisible={() => setsavedLocationVisible(true)}
                DestinationSelected={DestinationSelected}
                setDestinationSelected={(val) => setDestinationSelected(val)}
                setDestination={(val) => setdestination(val)}
                dispatchSaveDestination={(val) =>
                  context.dispatch({
                    type: "SAVE_DESTINATION",
                    payload: val,
                  })
                }
                destination={destination}
                getTripInfo={() => getTripInfo()}
              />
              <BigButton
                disabled={
                  location === null || destination === null ? true : false
                }
                onPress={() => {
                  props.navigation.navigate("Confirm");
                }}
                title={"Request"}
                titleStyle={{ fontWeight: "bold" }}
              />
            </View>
          </View>
        );
      }}
    </ContextConsumer>
  );
}
