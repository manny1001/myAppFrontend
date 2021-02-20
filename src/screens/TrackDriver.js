import React, { useState, lazy } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ContextConsumer } from "../../src/context/Context";
import Loader from "../components/Loader";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Modal from "modal-enhanced-react-native-web";
import { useQuery, useMutation } from "@apollo/client";
import { DRIVERS_LIVELOCATION, ALERT_EMAIL } from "../../src/utilites/Queries";
import { GetData } from "../../src/utilites/GFunctions";
import { StackActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
const BigButton = lazy(() => import("../components/Buttons"));
const Chat = lazy(() => import("../components/ChatApp"));
const DriversInfo = lazy(() => import("../../src/components/DriversInfo"));
const CallDriver = lazy(() => import("../components/CallDriver"));
const ProfilePicture = lazy(() => import("../components/ProfilePicture"));
const RatingScreen = lazy(() => import("./Rating"));
const TrackDriver = ({ navigation }) => {
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(false);
  const [destinationArrived, setdestinationArrived] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(1);
  const [sureModalVisible, setsureModalVisible] = React.useState(false);
  const [driverArrived, setDriverArrived] = React.useState(false);
  const [driverNotArrived, setdriverNotArrived] = React.useState(null);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [useruuid, setuseruuid] = React.useState(null);
  const [uuidTrip, setuuidTrip] = React.useState(null);
  const [driverRegistration, setDriverRegistration] = useState(null);
  const [timeRemaining, settimeRemaining] = React.useState(null);
  const [EmergencyAlert] = useMutation(ALERT_EMAIL);
  const { loading, error, data, stopPolling } = useQuery(DRIVERS_LIVELOCATION, {
    onCompleted: () => {
      /* if (
          data &&
          data.driversLocation[0] &&
          data.driversLocation[0].driverremainingtime === "0"
        ) {
          stopPolling();
        } */
      if (
        data &&
        data.driversLocation[0] &&
        JSON.parse(data.driversLocation[0].driverremainingtime) !==
          timeRemaining
      ) {
        settimeRemaining(
          data &&
            data.driversLocation[0] &&
            JSON.parse(data.driversLocation[0].driverremainingtime)
        );
      }
      /* console.log(data); */
    },
    variables: {
      uuidUser: useruuid,
      uuidTrip: uuidTrip,
    },
    pollInterval: 2800,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const zoomOut3 = {
    0: { opacity: 0, scale: 0.0 },
    0.5: {
      opacity: 0.2,
      scale: 0.0,
    },
    1: {
      opacity: 0,
      scale: 0.5,
    },
  };
  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
    GetData("uuidTrip").then((value) => setuuidTrip(value));
  });
  if (
    (data && data.driversLocation === undefined) ||
    (data && data.driversLocation[0] === undefined)
  )
    return <Loader />;
  if (
    data &&
    data.driversLocation &&
    data.driversLocation[0] &&
    data.driversLocation[0].driverremainingtime === null
  ) {
    return <Loader />;
  }
  if (error) return <Text>Error</Text>;
  return (
    <View style={styles.container}>
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
            <Text style={{ alignSelf: "center" }}>
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
                                  status:
                                    data && data.driversLocation[0].status,
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

      <View
        style={{
          width: driverArrived === true ? wp(50) : wp(85),
          flex: 1,
          alignSelf: "center",

          justifyContent: "center",
        }}
      >
        {driverArrived === false && (
          <Chat uuidTrip={uuidTrip} userUUID={useruuid} />
        )}
        {driverArrived === true && (
          <View style={{ flex: 1, baclgroundColor: "pink" }}>
            <CountdownCircleTimer
              containerStyle={{
                alignSelf: "center",
                flex: 1,
                baclgroundColor: "pink",
              }}
              styles={{ borderWidth: null, alignSelf: "center" }}
              onComplete={() => {}}
              size={wp(50)}
              isPlaying={true}
              duration={
                data &&
                data.driversLocation[0] &&
                data.driversLocation[0].drivercustomerarrivaltime
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
          </View>
        )}
      </View>

      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={destinationArrived}
        onBackdropPress={() => setsureModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(5),
              alignSelf: "center",
              width: wp(75),
            }}
          >
            Have you arrived safely?
          </Text>
          <BigButton
            onPress={() => {
              setRatingModalVIsibile(true), setsureModalVisible(false);
            }}
            title={"Yes"}
            titleStyle={{
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
            containerStyle={{
              top: hp(10),
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
          />
          <BigButton
            onPress={() => {
              setsureModalVisible(false);
              EmergencyAlert({
                variables: {
                  uuidTrip: data && data.driversLocation[0].uuidTrip,
                  message: `${data && data.driversLocation[0].name} , ${
                    data && data.driversLocation[0].cellphone
                  } , I did not arrive safely , please help , DriverName : ${
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
            title={"No"}
            titleStyle={{
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
            containerStyle={{
              top: hp(15),
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
          />
        </View>
      </Modal>
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={modalVisible}
        onBackdropPress={() => setmodalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(5),
              alignSelf: "center",
              width: wp(75),
            }}
          >
            One of our call center agents will get back to you within the next 5
            mins
          </Text>
          <BigButton
            onPress={() => {
              setmodalVisible(false), setDriverArrived(false);
            }}
            title={"Okay"}
            titleStyle={{
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
            containerStyle={{
              top: hp(20),
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
          />
        </View>
      </Modal>
      <Modal isVisible={RatingModalVIsibile} onBackdropPress={() => {}}>
        <RatingScreen
          onPress={() => {
            setRatingModalVIsibile(false),
              navigation.dispatch(StackActions.replace("Trip"));
          }}
        />
      </Modal>
      <Modal isVisible={sureModalVisible} onBackdropPress={() => {}}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(5),
              alignSelf: "center",
              width: wp(75),
            }}
          >
            Are you sure your driver has arrived?
          </Text>
          <BigButton
            onPress={() => {
              setsureModalVisible(false), setDriverArrived(true);
            }}
            title={"Yes"}
            titleStyle={{
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
            containerStyle={{
              top: hp(10),
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
          />
          <BigButton
            onPress={() => {
              setsureModalVisible(false), setDriverArrived(false);
              EmergencyAlert({
                variables: {
                  uuidTrip: data && data.driversLocation[0].uuidTrip,
                  message: `${data && data.driversLocation[0].name} , ${
                    data && data.driversLocation[0].cellphone
                  } , Driver has not yet arrived , second time I am contacting you , please assist... , DriverName : ${
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
            title={"No"}
            titleStyle={{
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
            containerStyle={{
              top: hp(15),
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default function ({ navigation }) {
  return (
    <ContextConsumer>
      {(context) => {
        return <TrackDriver context={context} navigation={navigation} />;
      }}
    </ContextConsumer>
  );
}
