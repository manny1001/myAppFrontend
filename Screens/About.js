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
const About = (props) => {
  const DATA = [
    {
      id: "1",
      title: "Application Version",
      description: "ShopForIt 4.4.4",
    },
    {
      id: "2",
      description: "Copyright 2020 Predict IT. All Rights Reserved",
      title: "Legal Information",
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        backColor={"transparent"}
        CenterComponent={<Text style={{ fontSize: RFValue(20) }}>About</Text>}
      />
      <View style={{}}>{<FlatListAbout DATA={DATA} props={props} />}</View>
    </View>
  );
};

const FlatListAbout = (props) => {
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
          data={props.DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                padding: 20,
                marginVertical: hp(1),
                width: wp(80),
                borderBottomWidth: 0.1,
                borderBottomColor: "#d3d3d3",
                height: hp(8),
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              {item.icon}
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text
                  style={{
                    fontSize: RFValue(18),

                    fontWeight: "400",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(12),

                    fontWeight: "300",
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    flex: 0.16,
    justifyContent: "center",
  },
});

export default About;
