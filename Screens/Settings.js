import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const AysncLogout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    return true;
  } catch (e) {
    return false;
  }
};
const Usersettings = (props) => {
  const { context } = props;
  const DATA = [
    {
      id: "1",
      icon: <View style={styles.iconStyle}></View>,
      title: "Notifications",
    },
    {
      id: "2",
      icon: <View style={styles.iconStyle}></View>,
      title: "Feedback",
    },
    {
      id: "3",
      icon: <View style={styles.iconStyle}></View>,
      title: "About",
    },
  ];
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        style={{
          flex: 1,
        }}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              item.id === "2" && props.navigation.navigate("Feedback");
              item.id === "3" && props.navigation.navigate("About");
            }}
            style={{
              padding: 20,
              marginVertical: hp(1),
              width: wp(100),
              borderBottomWidth: 0.1,
              borderBottomColor: "#d3d3d3",
              height: hp(4),
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            {item.icon}
            <Text
              style={{
                fontSize: RFValue(18),
                alignSelf: "center",
                fontWeight: "300",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          borderTopWidth: 0.1,
          borderTopColor: "#d3d3d3",
          backgroundColor: "#f5f5f5",
          width: wp(100),
          height: hp(8),
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            marginLeft: wp(5),
            fontSize: wp(5),
            alignSelf: "center",
          }}
        >
          Logout
        </Text>

        <TouchableOpacity
          onPress={() => {
            {
              AysncLogout(), context.dispatch({ type: "SIGN_OUT" });
            }
          }}
          style={{
            justifyContent: "center",
            alignSelf: "center",

            flexDirection: "row",
            width: wp(10),
            marginRight: wp(5),
            height: hp(5),
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    flex: 0.16,
    justifyContent: "center",
  },
});

export default Usersettings;
/*  */
