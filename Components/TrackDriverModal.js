import React, { useState, lazy } from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ContextConsumer } from "../Context";
const Chat = lazy(() => import("../Components/ChatApp"));
const CountDown = lazy(() => import("../Components/CountDown"));
const DriversInfo = lazy(() => import("../Components/DriversInfo"));
const CallDriver = lazy(() => import("../Components/CallDriver"));
const ProfilePicture = lazy(() => import("../Components/ProfilePicture"));
const TrackDriver = ({ onPress }) => {
  const [DriverName, setDriverName] = useState("Peter");
  const [DriverRegistration, setDriverRegistration] = useState("YH KO HJ GP");
  const [DriverCarModel, setDriverCarModel] = useState("Hyundai i20");

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

        <CountDown onPress={onPress} />
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

export default function (props) {
  return (
    <ContextConsumer>
      {(context) => {
        return <TrackDriver {...props} context={context} />;
      }}
    </ContextConsumer>
  );
}
