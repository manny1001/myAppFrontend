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
import { useQuery } from "@apollo/client";
import { DRIVERS_LIVELOCATION } from "../Queries";
import { GetData } from "../GFunctions";
const Chat = lazy(() => import("../Components/ChatApp"));
const CountDown = lazy(() => import("../Components/CountDown"));
const DriversInfo = lazy(() => import("../Components/DriversInfo"));
const CallDriver = lazy(() => import("../Components/CallDriver"));
const ProfilePicture = lazy(() => import("../Components/ProfilePicture"));
const TrackDriver = ({ onPress, context, No, Isplaying }) => {
  const [firstPoll, setFirstPoll] = React.useState(null);
  const [useruuid, setuseruuid] = React.useState(null);
  const [driverImage, setdriverImage] = React.useState(null);
  const { loading, errror, data, stopPolling } = useQuery(
    DRIVERS_LIVELOCATION,
    {
      onCompleted: () => {
        console.log(
          data && data.getDriversLocation && data.getDriversLocation[0]
        ),
          /* setRequestStatus(
          data &&
            data.getDriversLocation &&
            data.getDriversLocation[0] &&
            data.getDriversLocation[0].status
        ), */
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

  const [timeRemaining, settimeRemaining] = React.useState();
  const [DriverName, setDriverName] = useState("Peter");
  const [DriverRegistration, setDriverRegistration] = useState("YH KO HJ GP");
  const [DriverCarModel, setDriverCarModel] = useState("Hyundai i20");
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
          DriverName={DriverName}
          DriverCarModel={DriverCarModel}
          DriverRegistration={DriverRegistration}
        />
        {No === true && (
          <TouchableOpacity
            onPress={() =>
              context.dispatch({
                type: "SAVE_ACTIVEREQUEST",
                activeRequest: false,
              })
            }
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: RFPercentage(2.5),
              }}
            >
              Exit
            </Text>
          </TouchableOpacity>
        )}
        {No === true && (
          <Text
            style={{
              alignSelf: "center",
              fontSize: RFPercentage(2.5),
            }}
          >
            One of Our call centre agents will call you back shortly...you can
            keep chatting with your driver to find out where he is...
          </Text>
        )}

        <View
          style={[
            styles.TopInfo,
            { alignSelf: "flex-end", borderWidth: null, backgroundColor: "" },
          ]}
        >
          {timeRemaining !== 0 && !loading ? (
            <CountdownCircleTimer
              initialRemainingTime={10}
              styles={{ borderWidth: null }}
              onComplete={() => {
                settimeRemaining(0);
              }}
              size={wp(30)}
              isPlaying={true}
              duration={20}
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
            <Text
              style={{
                alignSelf: "center",
                fontSize: RFPercentage(2.5),
              }}
            >
              Has you driver has arrived?
            </Text>
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
