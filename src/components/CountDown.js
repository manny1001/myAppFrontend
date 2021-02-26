import {
  React,
  CountdownCircleTimer,
  RFPercentage,
  View,
  Animated,
  styles,
  wp,
} from "../api/constants";

const CountDown = ({ onPress }) => {
  const [timerisPlaying, settimerisPlaying] = React.useState(true);

  React.useState(() => {});
  return (
    <View
      style={[
        styles.TopInfo,
        { alignSelf: "flex-end", borderWidth: 0, backgroundColor: "" },
      ]}
    >
      <CountdownCircleTimer
        onComplete={() => {
          // do your stuff here
          return [true, 1500]; // repeat animation in 1.5 seconds
        }}
        size={wp(30)}
        isPlaying
        duration={10}
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
                flex: 1,
                justifyContent: "center",
              }}
            >
              {remainingTime > 10 && (
                <Animated.Text
                  style={{
                    color: animatedColor,
                    alignSelf: "center",
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
                  }}
                >
                  Driver has arrived
                </Animated.Text>
              )}
              <Animated.Text
                style={{
                  color: animatedColor,
                  alignSelf: "center",
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

export default CountDown;
