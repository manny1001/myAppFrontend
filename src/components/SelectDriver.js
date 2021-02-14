import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLinkTo } from "@react-navigation/native";
import { ContextConsumer } from "../../src/context/Context";
import { useQuery } from "@apollo/client";
import { GET_DRIVERS } from "../utilites/Queries";
import { AllDrivers } from "../components/AllDrivers";

const ClickedDriver = (props) => {
  const { name, surname, cellphone, picture, registration, model, status } =
    props.clickedDriver && props.clickedDriver.item;
  {
    if (status !== "Online") return <></>;
    return (
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignSelf: "center",
          height: hp(30),
          borderWidth: wp(0.25),
          padding: wp(2),
          borderRadius: wp(2),
          width: wp(90),
        }}
      >
        <View style={styles.driverDetails}>
          <Text style={{ fontWeight: "bold" }}>Name</Text>
          <Text>
            {name} {surname}
          </Text>
          <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
            Cellphone
          </Text>
          <Text>{cellphone}</Text>
          <Text style={{ fontWeight: "bold" }}>Registration</Text>
          <Text>{registration}</Text>
          <Text style={{ fontWeight: "bold" }}>Model</Text>
          <Text>{model}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <Avatar
            renderPlaceholderContent={picture && <ActivityIndicator />}
            rounded
            size="xlarge"
            containerStyle={{
              height: hp(15),
              width: hp(15),
              borderRadius: hp(7.5),
              alignSelf: "center",
            }}
            source={{ uri: picture }}
          />
          <Text style={{ alignSelf: "center" }}>7 mins away</Text>
        </View>
      </View>
    );
  }
};

export default function (props) {
  const { context } = props;
  const [clickedDriver, setClickedDriver] = React.useState(null);
  const AysncLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      return true;
    } catch (e) {
      return false;
    }
  };

  const linkTo = useLinkTo();

  const { error, data, stopPolling } = useQuery(GET_DRIVERS, {
    onCompleted: () => {
      context &&
        context.dispatch({
          type: "SAVE_TOTAL_DRIVERS_ONLINE",
          totalDriversOnline: data.allDriver.length,
        });
      if (context && context.state.driveruuid !== "") {
        stopPolling();
      }
    },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    pollInterval: 7000,
  });
  if (error) return <Text>{error.message}</Text>;
  if (data && data.allDriver !== undefined)
    return (
      <ContextConsumer>
        {(context) => {
          return (
            <>
              {context.state.driveruuid === "" && (
                <AllDrivers
                  {...props}
                  setClickedDriver={setClickedDriver}
                  linkTo={linkTo}
                  context={context}
                  DriverDetails={data.allDriver}
                />
              )}
              {context.state.driveruuid !== "" && (
                <ClickedDriver
                  clickedDriver={clickedDriver !== null && clickedDriver}
                  {...props}
                  linkTo={linkTo}
                  context={context}
                />
              )}
            </>
          );
        }}
      </ContextConsumer>
    );
  return <></>;
}

const styles = StyleSheet.create({
  driverDetails: {
    justifyContent: "space-around",
    width: wp(50),
    flex: 1,
  },
});
