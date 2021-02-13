import React, { useState, lazy } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
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
const BigButton = lazy(() => import("../components/Buttons"));
const Chat = lazy(() => import("../components/ChatApp"));
const DriversInfo = lazy(() => import("../../src/components/DriversInfo"));
const CallDriver = lazy(() => import("../components/CallDriver"));
const ProfilePicture = lazy(() => import("../components/ProfilePicture"));
const RatingScreen = lazy(() => import("./Rating"));
const TrackDriver = ({ navigation }) => {
  const [driversImage, setdriversImage] = React.useState(null);
  const [driversCellphone, setdriversCellphone] = React.useState(null);
  const [cellphone, setcellphone] = React.useState(null);
  const [name, setusername] = React.useState(null);
  const [uuidTrip, setuuidTrip] = React.useState(null);
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(false);
  const [destinationArrived, setdestinationArrived] = React.useState(false);
  const [timeTillArrival, setTimeTillArrival] = React.useState(null);
  const [clickCount, setClickCount] = React.useState(1);
  const [sureModalVisible, setsureModalVisible] = React.useState(false);
  const [driverArrived, setDriverArrived] = React.useState(false);
  const [driverNotArrived, setdriverNotArrived] = React.useState(null);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [driverDuration, setDriverDuration] = React.useState(null);
  const [driverremainingtime, setdriverremainingtime] = React.useState(null);
  const [drivername, setdrivername] = React.useState(null);
  const [useruuid, setuseruuid] = React.useState(null);
  const [driverImage, setdriverImage] = React.useState(null);
  const [driverRegistration, setDriverRegistration] = useState(null);
  const [driverCarModel, setDriverCarModel] = useState(null);
  const [timeRemaining, settimeRemaining] = React.useState(null);
  const [RequestStatus, setRequestStatus] = React.useState(null);
  const [EmergencyAlert] = useMutation(ALERT_EMAIL);
  const { loading, errror, data, stopPolling } = useQuery(
    DRIVERS_LIVELOCATION,
    {
      onCompleted: () => {
        console.log(data);
        setdriversCellphone(
          data && data.getDriversLocation[0].driversCellphone
        );
        setdriverremainingtime(
          JSON.parse(
            data &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].driverremainingtime
          )
        ),
          setdriversImage(data && data.getDriversLocation[0].driverImage);
        setcellphone(data && data.getDriversLocation[0].cellphone),
          setusername(data && data.getDriversLocation[0].name),
          setuuidTrip(data && data.getDriversLocation[0].uuidTrip),
          setTimeTillArrival(
            data &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].drivercustomerarrivaltime
          ),
          setDriverDuration(data && data.getDriversLocation[0].driverduration);
        setRequestStatus(data && data.getDriversLocation[0].status),
          setDriverRegistration(
            data && data.getDriversLocation[0].driverregistration
          ),
          setDriverCarModel(data && data.getDriversLocation[0].model),
          setdrivername(data && data.getDriversLocation[0].drivername),
          setdriverImage(data && data.getDriversLocation[0].driverImage);

        /* if (
        [undefined, "On-Route,Pickup", "Arrived", "Completed"].indexOf(
          data &&
           
     
            data.getDriversLocation[0].status
        )
      ) {
      } */
      },
      variables: { uuidUser: useruuid },
      /*  pollInterval: 10000, */
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
  }, []);
  console.log(data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#f2f2f2",
      }}
    >
      {/* {data &&
        data.getDriversLocation[0] &&
        data.getDriversLocation[0].driversLiveLocation === null && <Loader />} */}
      <View
        style={{
          width: wp(100),
          flex: 1,
          alignSelf: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: wp(8),
        }}
      >
        <ProfilePicture
          source={{
            uri: driverImage,
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
          DriverName={drivername}
          DriverCarModel={driverCarModel}
          DriverRegistration={driverRegistration}
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
                    uuidTrip: uuidTrip,
                    message: `${name} , ${cellphone} , Emergency!!! Somethng is wrong please help me , DriverName : ${drivername} , DriverCellphone : ${driversCellphone} ,DriversImage : ${driversImage}, TripUUID : `,
                    status: RequestStatus,
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
              { alignSelf: "flex-end", borderWidth: null, backgroundColor: "" },
            ]}
          >
            {timeRemaining !== 0 && !loading ? (
              <CountdownCircleTimer
                initialRemainingTime={
                  driverremainingtime && driverremainingtime
                }
                styles={{ borderWidth: null }}
                onComplete={() => {
                  settimeRemaining(0);
                }}
                size={wp(40)}
                isPlaying={true}
                duration={
                  data &&
                  data.getDriversLocation &&
                  data.getDriversLocation[0] &&
                  JSON.parse(data.getDriversLocation[0].driverduration)
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
            ) : (
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
                                uuidTrip: uuidTrip,
                                message: `${name} , ${cellphone} , Driver Not yet arrived , DriverName : ${drivername} , DriverCellphone : ${driversCellphone} ,DriversImage : ${driversImage}, TripUUID : `,
                                status: RequestStatus,
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
          marginBottom: hp(1),
          borderRadius: wp(3),
          justifyContent: "center",
        }}
      >
        <LinearGradient colors={["white", "#ffffff00"]} />
        {driverArrived === false && (
          <Chat
            uuidTrip={
              data &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].uuidTrip
            }
            userUUID={
              data &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].uuidUser
            }
            driverUUID={
              data &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].uuidDriver
            }
          />
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
              duration={timeTillArrival && timeTillArrival}
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
                  uuidTrip: uuidTrip,
                  message: `${name} , ${cellphone} , I did not arrive safely , please help , DriverName : ${drivername} , DriverCellphone : ${driversCellphone} ,DriversImage : ${driversImage}, TripUUID : `,
                  status: RequestStatus,
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
                  uuidTrip: uuidTrip,
                  message: `${name} , ${cellphone} , Driver has not yet arrived , second time I am contacting you , please assist... , DriverName : ${drivername} , DriverCellphone : ${driversCellphone} ,DriversImage : ${driversImage}, TripUUID : `,
                  status: RequestStatus,
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
const styles = StyleSheet.create({
  TopInfo: {
    width: wp(32),
    height: wp(32),
    alignSelf: "center",
    borderRadius: wp(16),
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: wp(1),
    backgroundColor: "white",
  },
});
