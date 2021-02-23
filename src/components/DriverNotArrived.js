//import liraries
import React, { lazy } from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
const Chat = lazy(() => import("../components/ChatApp"));
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const DriverNotArrived = ({ driverArrived, data, uuidTrip, useruuid }) => {
  return (
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
export default DriverNotArrived;
