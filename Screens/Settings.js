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

const Usersettings = (props) => {
  const DATA = [
    {
      id: "1",
      icon: <View style={styles.iconStyle}></View>,
      title: "Bank Cards",
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
      <View
        style={{
          flex: 1,
          alignSelf: "center",
        }}
      >
        <FlatList
          style={{
            flex: 1,
          }}
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                item.id === "1" && props.navigation.navigate("CardSettings");
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
