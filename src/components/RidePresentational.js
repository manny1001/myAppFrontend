import React, { Component, lazy } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ContextConsumer } from "../context/Context";
const PickUpLocation = lazy(() =>
  import("../../src/components/PickUpLocation")
);
const Destination = lazy(() => import("../../src/components/Destination"));
import styles from "../styles/styles";
const BigButton = lazy(() => import("../../src/components/Buttons"));
const Confirmation = ({
  isClicked,
  setisClicked,
  locationSelected,
  setlocationSelected,
  currentLocation,
  setCurrentLocationHandler,
  getTripInfo,
  destination,
  time,
  distance,
  DestinationSelected,
  setDestinationSelected,
  setdestination,
  navigation,
}) => {
  const [isFocused, setisFocused] = React.useState("green");

  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View style={styles.container}>
            <PickUpLocation
              setIsClicked={() => setisClicked(!isClicked)}
              isClicked={isClicked}
              setLocationSelected={() => setlocationSelected(true)}
              locationSelected={locationSelected}
              currentLocation={currentLocation}
              setCurrentLocation={() => setCurrentLocationHandler()}
              getTripInfo={() => getTripInfo()}
            />
            {location !== null && destination !== null && (
              <>
                <View style={styles.timeAndDistanceContainer}>
                  <Text
                    style={{
                      fontFamily: "Gotham_Medium_Regular",
                      alignSelf: "center",
                    }}
                  >
                    {time}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Gotham_Medium_Regular",
                      alignSelf: "center",
                    }}
                  >
                    {distance}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: "Gotham_Medium_Regular",
                    alignSelf: "center",
                  }}
                >
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
            <View
              style={{
                flexDirection: "row",
                alignSelf: "stretch",
                justifyContent: "space-evenly",
                margin: 5,
              }}
            >
              <TouchableOpacity onFocus={() => setisFocused("green")}>
                <Text
                  style={[
                    styles.urgencyButton,
                    {
                      borderColor: isFocused === "green" ? "black" : "#f4f4f4",
                    },
                  ]}
                >
                  I'M CHILLED
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onFocus={() => setisFocused("blue")}>
                <Text
                  style={[
                    styles.urgencyButton,
                    {
                      borderColor: isFocused === "blue" ? "black" : "#f4f4f4",
                    },
                  ]}
                >
                  KINDA RUSHING
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onFocus={() => setisFocused("red")}>
                <Text
                  style={[
                    styles.urgencyButton,
                    {
                      borderColor: isFocused === "red" ? "black" : "#f4f4f4",
                    },
                  ]}
                >
                  I'M LATE
                </Text>
              </TouchableOpacity>
            </View>

            <BigButton
              disabled={
                location === null || destination === null ? true : false
              }
              onPress={() => {
                navigation.navigate("Confirm");
              }}
              title={"Next"}
              titleStyle={{ fontWeight: "bold" }}
            />
            {/*        <ShadowButton title="Next" /> */}
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default Confirmation;
