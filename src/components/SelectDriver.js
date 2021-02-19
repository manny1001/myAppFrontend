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
          borderRadius: wp(2),
          padding: wp(3),
          width: wp(80),
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
            style={{
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
  const { context, stopPoll, error, data } = props;
  const [clickedDriver, setClickedDriver] = React.useState(null);

  const linkTo = useLinkTo();

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
    flex: 1,
  },
});
