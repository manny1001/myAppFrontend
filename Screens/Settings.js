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
import Header from "../Components/Header";

const Usersettings = (props) => {
  const DATA = [
    {
      id: "1",
      icon: (
        <View style={styles.iconStyle}>
          {/*  <MaterialCommunityIcons
            name="credit-card-plus-outline"
            size={24}
            color="black"
          /> */}
        </View>
      ),
      title: "Bank Cards",
    },
    {
      id: "2",
      icon: (
        <View style={styles.iconStyle}>
          {/*  <Octicons name="report" size={24} color="black" /> */}
        </View>
      ),
      title: "Feedback",
    },
    {
      id: "3",
      icon: (
        <View style={styles.iconStyle}>
          {/*   <Feather name="info" size={24} color="black" /> */}
        </View>
      ),
      title: "About",
    },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          height: hp(50),
          width: wp(80),
          alignSelf: "center",
        }}
      >
        <FlatList
          style={{
            flex: 1,
            height: hp(50),
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
                width: wp(80),
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
      {/* <View
        style={{
          position: "absolute",
          bottom: 0,
          borderTopWidth: 1,
          borderTopColor: "grey",

          width: wp(100),
          height: hp(8),
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          style={{ marginLeft: wp(5), fontSize: wp(5), alignSelf: "center" }}
        >
          Logout
        </Text>
        <TouchableOpacity
          onPress={() => {
            AysncLogout(), signOut();
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
          <SimpleLineIcons size={hp(4)} name="logout" color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    flex: 0.16,
    backgroundColor: "red",
    justifyContent: "center",
  },
});

//make this component available to the app
export default Usersettings;
