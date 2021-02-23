import React, { lazy } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const GoogleAutoComplete = lazy(() => import("./GoogleAutoComplete"));
import { ContextConsumer } from "../../src/context/Context";
const PickUpLocation = ({
  isClicked,
  setLocationSelected,
  currentLocation,
  setIsClicked,
  setCurrentLocation,
  getTripInfo,
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
            <Text
              style={{
                fontFamily: "Gotham_Medium_Regular",
                fontSize: RFPercentage(3),
              }}
            >
              Pickup
            </Text>
            <View
              style={{
                height: hp(10),
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {isClicked === false ? (
                currentLocation === "" || currentLocation === null ? (
                  <View
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Gotham_Medium_Regular",
                        alignSelf: "center",
                      }}
                    >
                      Getting Location
                    </Text>
                    <ActivityIndicator
                      size="small"
                      style={{ alignSelf: "center" }}
                      color={"green"}
                    />
                  </View>
                ) : (
                  <Text>{currentLocation}</Text>
                )
              ) : (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  dispatchAddress={(data) => {
                    context.dispatch({
                      type: "SAVE_PICKUPLOCATION",
                      payload: data,
                    });
                  }}
                  setSelected={setLocationSelected}
                  getTripInfo={getTripInfo}
                />
              )}

              {/* {location === "" ? (
                <View
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                   <Text style={{fontFamily: "Gotham_Medium_Regular",
 alignSelf: "center" }}>Getting Location</Text>
                  <ActivityIndicator
                    size="small"
                    style={{ alignSelf: "center" }}
                    color={"green"}
                  />
                </View>
              ) : (
                <Text>{location}</Text>
              )} */}
              {/* {isClicked === false ? (
                <Text>{context.state.location}</Text>
              ) : (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  setSelected={(val) => {}}
                  setisClicked={setisClicked}
                  dispatchAddress={(data) => {
                    context.dispatch({
                      type: "SAVE_PICKUPLOCATION",
                      payload: data,
                    });
                  }}
                />
              )} */}

              {/* {isClicked === true ? (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  setSelected={(val) => {}}
                  setisClicked={setisClicked}
                  dispatchAddress={(data) => {
                    context.dispatch({
                      type: "SAVE_PICKUPLOCATION",
                      payload: data,
                    });
                  }}
                />
              ) : context.state.location === "" ? (
                <View
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                   <Text style={{fontFamily: "Gotham_Medium_Regular",
 alignSelf: "center" }}>Getting Location</Text>
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
                  {location !== null ? location : context.state.location}
                </Text>
              )} */}

              <TouchableOpacity onPress={() => setIsClicked()}>
                <Text
                  style={{
                    padding: wp(2.5),
                    fontFamily: "Gotham_Medium_Regular",
                    textDecorationLine: "underline",
                  }}
                >
                  Switch
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default PickUpLocation;
