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
import { ContextConsumer } from "../Context";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Modal from "modal-enhanced-react-native-web";
import { useQuery } from "@apollo/client";
import { DRIVERS_LIVELOCATION } from "../Queries";
import { GetData } from "../GFunctions";
const BigButton = lazy(() => import("../Components/Buttons"));
const Chat = lazy(() => import("../Components/ChatApp"));
const CountDown = lazy(() => import("../Components/CountDown"));
const DriversInfo = lazy(() => import("../Components/DriversInfo"));
const CallDriver = lazy(() => import("../Components/CallDriver"));
const ProfilePicture = lazy(() => import("../Components/ProfilePicture"));
const TrackDriver = ({ onPress, context, No, Isplaying }) => {
  const [driverArrived, setDriverArrived] = React.useState(null);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [driverDuration, setDriverDuration] = React.useState(null);
  const [drivername, setdrivername] = React.useState(null);
  const [useruuid, setuseruuid] = React.useState(null);
  const [driverImage, setdriverImage] = React.useState(null);
  const [driverRegistration, setDriverRegistration] = useState(null);
  const [driverCarModel, setDriverCarModel] = useState(null);
  const [timeRemaining, settimeRemaining] = React.useState(null);
  const { loading, errror, data, stopPolling } = useQuery(
    DRIVERS_LIVELOCATION,
    {
      onCompleted: () => {
        console.log(
          data && data.getDriversLocation && data.getDriversLocation[0]
        ),
          setDriverDuration(
            data &&
              data.getDriversLocation &&
              data.getDriversLocation[0].driverduration
          );
        /* setRequestStatus(
          data &&
            data.getDriversLocation &&
            data.getDriversLocation[0] &&
            data.getDriversLocation[0].status
        ), */
        setDriverRegistration(
          data &&
            data.getDriversLocation &&
            data.getDriversLocation[0] &&
            data.getDriversLocation[0].driverregistration
        ),
          setDriverCarModel(
            data &&
              data.getDriversLocation &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].model
          ),
          setdrivername(
            data &&
              data.getDriversLocation &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].drivername
          ),
          setdriverImage(
            data &&
              data.getDriversLocation &&
              data.getDriversLocation[0] &&
              data.getDriversLocation[0].driverImage
          );

        /* if (
        [undefined, "On-Route,Pickup", "Arrived", "Completed"].indexOf(
          data &&
            data.getDriversLocation &&
            data.getDriversLocation[0] &&
            data.getDriversLocation[0].status
        )
      ) {
      } */
      },
      variables: { uuidUser: useruuid },
      pollInterval: 10000,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
  }, []);
  /* if (requestStatus === "Arrived") return <View></View>; */
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#f2f2f2",
      }}
    >
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
        <CallDriver />
        <DriversInfo
          DriverName={drivername}
          DriverCarModel={driverCarModel}
          DriverRegistration={driverRegistration}
        />

        <View
          style={[
            styles.TopInfo,
            { alignSelf: "flex-end", borderWidth: null, backgroundColor: "" },
          ]}
        >
          {timeRemaining !== 0 && !loading ? (
            <CountdownCircleTimer
              initialRemainingTime={
                data &&
                data.getDriversLocation &&
                JSON.parse(data.getDriversLocation[0].driverremainingtime)
              }
              styles={{ borderWidth: null }}
              onComplete={() => {
                settimeRemaining(0);
              }}
              size={wp(30)}
              isPlaying={true}
              duration={
                data &&
                data.getDriversLocation &&
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
                <TouchableOpacity>
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
                {driverArrived === null && (
                  <TouchableOpacity
                    onPress={() => {
                      setmodalVisible(true);
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
                {driverArrived === false && (
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
      </View>
      <View
        style={{
          width: wp(85),
          flex: 1,
          alignSelf: "center",
          marginBottom: hp(1),
          borderRadius: wp(3),
        }}
      >
        <Chat />
      </View>
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={sureModal}
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
            Are you sure the driver has arrived?
          </Text>
          <BigButton
            onPress={() => {
              setSureModal(false), setDriverArrived(true);
            }}
            title={"Yes"}
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
           <BigButton
            onPress={() => {
              setSureModal(false), setDriverArrived(false);
            }}
            title={"No"}
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
            }
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
      ;
    </View>
  );
};

export default function ({ onPress, No, Isplaying }) {
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <TrackDriver
            context={context}
            onPress={onPress}
            No={No}
            Isplaying={Isplaying}
          />
        );
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
