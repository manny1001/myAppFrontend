import {
  React,
  View,
  Text,
  Animated,
  CountdownCircleTimer,
  RFPercentage,
  wp,
  Chat,
  styles,
} from "../api/constants";

const DriverNotArrived = ({
  driverArrived,
  data,
  uuidTrip,
  useruuid,
  loading,
}) => {
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
      {driverArrived === true && !loading && (
        <View style={{ flex: 1, baclgroundColor: "pink" }}>
          <Text style={styles.onRouteDestination}>Time till arrival</Text>
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

export default DriverNotArrived;
