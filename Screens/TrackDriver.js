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
const TrackDriver = () => {
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

        <CountDown />
      </View>

      <View
        style={{
          width: wp(95),
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
