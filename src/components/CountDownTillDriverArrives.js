import {
  React,
  styles,
  View,
  Text,
  CountdownCircleTimer,
  Animated,
  wp,
  hp,
  RFPercentage,
} from "../api/constants";
const CountDownTillDriverArrives = ({ data, loading }) => {
  return (
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
                      setdriverNotArrived(true), setmodalVisible(true);
                      /* EmergencyAlert({
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
                                  status:
                                    data && data.driversLocation[0].status,
                                },
                              }); */
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
  );
};

export default CountDownTillDriverArrives;
