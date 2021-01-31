import React, { useState, lazy } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ContextConsumer } from "../Context";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
const Chat = lazy(() => import("../Components/ChatApp"));
const CountDown = lazy(() => import("../Components/CountDown"));
const DriversInfo = lazy(() => import("../Components/DriversInfo"));
const CallDriver = lazy(() => import("../Components/CallDriver"));
const ProfilePicture = lazy(() => import("../Components/ProfilePicture"));
const TrackDriver = ({ onPress }) => {
  const [timerisPlaying, settimerisPlaying] = React.useState(true);
  const [DriverName, setDriverName] = useState("Peter");
  const [DriverRegistration, setDriverRegistration] = useState("YH KO HJ GP");
  const [DriverCarModel, setDriverCarModel] = useState("Hyundai i20");
  React.useEffect(() => {
    /* console.log("staeted"); */
  });
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
          source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
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

        <View
          style={[
            styles.TopInfo,
            { alignSelf: "flex-end", borderWidth: 0, backgroundColor: "" },
          ]}
        >
          <CountdownCircleTimer
            onComplete={() => onPress()}
            initialRemainingTime={5}
            size={wp(30)}
            isPlaying={false}
            duration={5}
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
                    borderRadius: wp(80),
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
                  {remainingTime === 0 && (
                    <Animated.Text
                      style={{
                        color: animatedColor,
                        alignSelf: "center",
                        fontSize: RFPercentage(2.5),
                      }}
                    >
                      Driver has arrived
                    </Animated.Text>
                  )}
                  <Animated.Text
                    style={{
                      color: animatedColor,
                      alignSelf: "center",
                      fontSize: RFPercentage(4),
                      fontWeight: "bold",
                    }}
                  >
                    {(remainingTime / 60).toFixed(2).split(".")[0]} :{" "}
                    {(remainingTime / 60).toFixed(2).split(".")[1]}
                  </Animated.Text>
                </Animated.View>
              );
            }}
          </CountdownCircleTimer>
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

export default function ({ onPress }) {
  return (
    <ContextConsumer>
      {(context) => {
        return <TrackDriver context={context} onPress={onPress} />;
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
