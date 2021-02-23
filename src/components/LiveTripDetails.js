import React, { useState, lazy } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
const DriversInfo = lazy(() => import("../../src/components/DriversInfo"));
const CallDriver = lazy(() => import("../components/CallDriver"));
const ProfilePicture = lazy(() => import("../components/ProfilePicture"));
const LiveTripDetails = ({ data, driverArrived, loading }) => {
  return (
    <View
      style={{
        width: wp(100),
        flex: 0.9,
        alignSelf: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: wp(5),
      }}
    >
      <ProfilePicture
        source={{
          uri:
            data &&
            data.driversLocation &&
            data.driversLocation[0] &&
            data.driversLocation[0].driverImage,
        }}
        style={{
          width: wp(28),
          height: wp(28),
          alignSelf: "center",
          borderRadius: wp(14),
          borderWidth: wp(1.5),
          borderColor: "#6c63ff",
        }}
      />
      {driverArrived === false && <CallDriver />}

      <DriversInfo
        DriverName={
          data && data.driversLocation && data.driversLocation[0].drivername
        }
        DriverCarModel={
          data && data.driversLocation && data.driversLocation[0].model
        }
        DriverRegistration={
          data &&
          data.driversLocation &&
          data.driversLocation[0].driverregistration
        }
      />
      {driverArrived === true && (
        <View
          style={{
            width: wp(100),
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Gotham_Medium_Regular",
              alignSelf: "center",
            }}
          >
            Enjoy your trip let us know if anything goes wrong
          </Text>

          <TouchableOpacity
            disabled={clickCount === 3 ? true : false}
            onPress={() => {
              EmergencyAlert({
                variables: {
                  uuidTrip: data && data.driversLocation[0].uuidTrip,
                  message: `${data && data.driversLocation[0].name} , ${
                    data && data.driversLocation[0].cellphone
                  } , Emergency!!! Somethng is wrong please help me , DriverName : ${
                    data && data.driversLocation[0].drivername
                  } , DriverCellphone : ${
                    data && data.driversLocation[0].driversCellphone
                  } ,DriversImage : ${
                    data &&
                    data.driversLocation[0].data &&
                    data.driversLocation[0].driverImage
                  }, TripUUID : `,
                  status: data && data.driversLocation[0].status,
                },
              });
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize:
                  clickCount === 3 ? RFPercentage(4.5) : RFPercentage(3.5),
                flex: 1,
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
                borderWidth: clickCount === 3 ? null : wp(1),
                height: wp(9),
                borderRadius: wp(10),
                borderColor: "white",
                padding: wp(1),
              }}
            >
              {clickCount === 3 ? `Alert Sent!` : `Emergency Button`}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {driverArrived === false && (
        <View
          style={[
            styles.TopInfo,
            { alignSelf: "center", borderWidth: null, backgroundColor: "" },
          ]}
        >
          {data &&
            data.driversLocation[0] &&
            data.driversLocation[0].driverremainingtime !== "0" &&
            !loading && (
              <CountdownCircleTimer
                /*   initialRemainingTime={timeRemaining} */
                styles={{ borderWidth: null }}
                onComplete={() => {
                  settimeRemaining(0);
                }}
                size={wp(34)}
                isPlaying={true}
                duration={
                  data &&
                  data.driversLocation &&
                  data.driversLocation[0] &&
                  data.driversLocation[0].driverduration
                }
                colors={[
                  ["#004777", 0.4],
                  ["#F7B801", 0.4],
                  ["#A30000", 0.2],
                ]}
              >
                {({ remainingTime, animatedColor }) => {
                  return (
                    <Animated.View
                      style={{
                        borderWidth: null,
                        borderRadius: wp(0),
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      {/* <Animatable.View
                          iterationDelay={700}
                          animation={zoomOut3}
                          easing="ease-out"
                          iterationCount="infinite"
                          style={{
                            borderWidth: wp(2.5),
                            height: wp(100),
                            width: wp(100),
                            borderRadius: wp(50),
                            borderColor: "red",
                            position: "absolute",
                            left: wp(-40.5),
                          }}
                        ></Animatable.View> */}
                      {remainingTime > 10 && (
                        <Animated.Text
                          style={{
                            color: animatedColor,
                            alignSelf: "center",
                            fontSize: RFPercentage(3),
                          }}
                        >
                          Arriving in
                        </Animated.Text>
                      )}
                      {remainingTime <= 10 && remainingTime !== 0 && (
                        <Animated.Text
                          style={{
                            color: animatedColor,
                            alignSelf: "center",
                            fontSize: RFPercentage(3),
                          }}
                        >
                          Almost there
                        </Animated.Text>
                      )}

                      <Animated.Text
                        style={{
                          color: animatedColor,
                          alignSelf: "center",
                          fontSize: RFPercentage(3),
                          fontWeight: "bold",
                        }}
                      >
                        {(remainingTime / 60).toFixed(2).split(".")[0]} mins
                      </Animated.Text>
                    </Animated.View>
                  );
                }}
              </CountdownCircleTimer>
            )}
          {data &&
            data.driversLocation &&
            data.driversLocation[0] &&
            data.driversLocation[0].driverremainingtime === "0" && (
              <View
                style={{
                  justifyContent: "center",
                  width: wp(42),
                  height: hp(20),
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: RFPercentage(3),
                    flex: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Has your driver arrived?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => setsureModalVisible(true)}>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: RFPercentage(5),
                        flex: 1,
                        textAlign: "center",
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Yes
                    </Text>
                  </TouchableOpacity>
                  {driverNotArrived === null && (
                    <TouchableOpacity
                      onPress={() => {
                        {
                          setdriverNotArrived(true),
                            setmodalVisible(true),
                            EmergencyAlert({
                              variables: {
                                uuidTrip:
                                  data && data.driversLocation[0].uuidTrip,
                                message: `${
                                  data && data.driversLocation[0].name
                                } , ${
                                  data && data.driversLocation[0].cellphone
                                } , Driver Not yet arrived , DriverName : ${
                                  data && data.driversLocation[0].drivername
                                } , DriverCellphone : ${
                                  data &&
                                  data.driversLocation[0].driversCellphone
                                } ,DriversImage : ${
                                  data &&
                                  data.driversLocation[0].data &&
                                  data.driversLocation[0].driverImage
                                }, TripUUID : `,
                                status: data && data.driversLocation[0].status,
                              },
                            });
                        }
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: RFPercentage(5),
                          flex: 1,
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        No
                      </Text>
                    </TouchableOpacity>
                  )}
                  {driverNotArrived === true && (
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: RFPercentage(1.5),
                        flex: 1,
                        textAlign: "center",
                        width: wp(10),
                      }}
                    >
                      Standby for a call...
                    </Text>
                  )}
                </View>
              </View>
            )}
        </View>
      )}
    </View>
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
export default LiveTripDetails;