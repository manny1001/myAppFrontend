import React, { useState } from "react";
import { View, Text, Animated, Image, StyleSheet } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ContextConsumer } from "../Context";
import Chat from "../Components/ChatApp";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
const TrackDriver = () => {
  const [DriverTimeLeft, setDriverTimeLeft] = useState("03:12");
  const [DriverName, setDriverName] = useState("Peter");
  const [DriverRegistration, setDriverRegistration] = useState("YH KO HJ GP");
  const [DriverCarModel, setDriverCarModel] = useState("Hyundai i20");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
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
        <View
          style={[
            styles.TopInfo,
            { alignSelf: "flex-start", borderWidth: 0, backgroundColor: "" },
          ]}
        >
          <Image
            style={{
              width: wp(28),
              height: wp(28),
              alignSelf: "center",
              borderRadius: wp(14),
            }}
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
          />
        </View>
        <View style={styles.TopInfo}>
          <Text
            style={{
              alignSelf: "center",
              flexDirection: "column",
              fontSize: RFPercentage(2),
            }}
          >
            {DriverName}
          </Text>
          <Text
            style={{
              alignSelf: "center",
              flexDirection: "column",
              fontSize: RFPercentage(2),
            }}
          >
            {DriverCarModel}
          </Text>
          <Text
            style={{
              fontSize: RFPercentage(2),
              alignSelf: "center",
              fontWeight: "700",
            }}
          >
            {DriverRegistration}
          </Text>
        </View>
        <View
          style={[
            styles.TopInfo,
            { alignSelf: "flex-end", borderWidth: 0, backgroundColor: "" },
          ]}
        >
          <CountdownCircleTimer
            size={160}
            isPlaying
            duration={15}
            colors={[
              ["#004777", 0.4],
              ["#F7B801", 0.4],
              ["#A30000", 0.2],
            ]}
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.View
                style={{
                  width: 160,
                  borderRadius: wp(80),
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                {remainingTime > 10 && (
                  <Animated.Text
                    style={{ color: animatedColor, alignSelf: "center" }}
                  >
                    Arriving in
                  </Animated.Text>
                )}
                {remainingTime <= 10 && remainingTime !== 0 && (
                  <Animated.Text
                    style={{ color: animatedColor, alignSelf: "center" }}
                  >
                    Almost there
                  </Animated.Text>
                )}
                {remainingTime === 0 && (
                  <Animated.Text
                    style={{ color: animatedColor, alignSelf: "center" }}
                  >
                    Driver has arrived
                  </Animated.Text>
                )}
                <Animated.Text
                  style={{ color: animatedColor, alignSelf: "center" }}
                >
                  {remainingTime}
                </Animated.Text>
              </Animated.View>

              /*  <Text style={{ alignSelf: "center" }}>Arriving in </Text> */
            )}
          </CountdownCircleTimer>
        </View>
        {/* */}
      </View>

      <View
        style={{
          width: wp(95),
          flex: 1,
          alignSelf: "center",
        }}
      >
        <Chat />
      </View>
    </View>
  );
};

export default function (props) {
  const linkTo = useLinkTo();
  return (
    <ContextConsumer>
      {(context) => {
        return <TrackDriver {...props} linkTo={linkTo} context={context} />;
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
    borderWidth: 6,
    backgroundColor: "white",
  },
});
{
  /* <View
          style={{
            height: hp(30),
            width: wp(95),
            alignSelf: "center",
            marginTop: hp(2),
          }}
        >
          <FlatList
            data={DriverHistoryData}
            renderItem={({ item }) => (
              <DriverHistory
                item={item}
                DriverHistoryData={DriverHistoryData}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View> */
}
/* 
const DriverHistory = ({ item, DriverHistoryData }) => {
  return (
    <>
      <View
        style={{
          width: wp(90),
          height: hp(10),
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor:
            item.id === DriverHistoryData[DriverHistoryData.length - 1].id
              ? "green"
              : null,
          borderColor: "green",
          borderWidth: 2,
          flexDirection: "column",
          marginTop: hp(1),
        }}
      >
        <Text style={{ alignSelf: "center" }}>{item.timeAtLocation}</Text>
        <Text style={{ alignSelf: "center" }}>
          {item.id === DriverHistoryData[DriverHistoryData.length - 1].id &&
            "Just passed "}
          {item.id !== DriverHistoryData[DriverHistoryData.length - 1].id &&
            "Passed "}
          <Text>{item.DriverCurrentAddress}</Text>
        </Text>
      </View>
    </>
  );
}; */
/* const [DriverHistoryData, setDriverHistoryData] = useState([
  {
    id: "1",
    timeAtLocation: "15:28",
    DriverCurrentAddress: "Midrand Firestation",
  },
{
      id: "2",
      timeAtLocation: "15:30",
      DriverCurrentAddress: "Police Station",
    },
    {
      id: "3",
      timeAtLocation: "15:32",
      DriverCurrentAddress: "Halfway Gardens",
    }
]);  */
