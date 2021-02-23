//import liraries
import React from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar } from "react-native-elements";
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
          borderWidth: wp(0.3),
          borderRadius: wp(2),
          padding: wp(3),
          width: wp(80),
        }}
      >
        <View style={{ justifyContent: "space-around", flex: 1 }}>
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

export default ClickedDriver;
