import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { RFPercentage } from "react-native-responsive-fontsize";
import { View, Animated, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const CountDown = ({ onPress }) => {
  return (
    <View
      style={[
        styles.TopInfo,
        { alignSelf: "flex-end", borderWidth: 0, backgroundColor: "" },
      ]}
    >
      <CountdownCircleTimer
        size={wp(30)}
        isPlaying
        duration={1}
        colors={[
          ["#004777", 0.4],
          ["#F7B801", 0.4],
          ["#A30000", 0.2],
        ]}
      >
        {({ remainingTime, animatedColor }) => {
          remainingTime === 0 && onPress();
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
  );
};

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
export default CountDown;
