import React, { Component, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export const RESTAURANTLIST = ({ CarousalData, props, dispatch }) => {
  return (
    <FlatList
      numColumns={2}
      showsVerticalScrollIndicator={false}
      data={CarousalData}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{
            width: wp(50),
            height: hp(30),
            marginTop: hp(5),
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: "SELECT_RESTAURANT", item: item }),
                props.navigation.navigate("Food", { RestaurantInfo: item });
            }}
            style={{ alignSelf: "center" }}
          >
            <Image
              source={item.Logo}
              style={{
                alignSelf: "center",
                width: wp(30),
                height: wp(30),
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                fontSize: RFValue(14),
                fontWeight: "800",
              }}
            >
              {item.Name}
            </Text>
            <Text
              style={{
                fontSize: RFValue(11),
                fontWeight: "100",
                color: "grey",
              }}
            >
              {item.type.split(",")[0]} {item.type.split(",")[1]}{" "}
              {item.type.split(",")[2]}
            </Text>
            <View style={{ flexDirection: "row", marginTop: hp(0.25) }}>
              {/* <AntDesign
                name="star"
                size={wp(3)}
                color="red"
                style={{ alignSelf: "center" }}
              /> */}
              <Text
                style={{
                  fontSize: RFValue(10),
                  fontWeight: "400",
                  color: "grey",
                  alignSelf: "center",
                  marginLeft: wp(0.5),
                }}
              >
                4.9 (128 ratings)
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: hp(0.25) }}>
              <Text
                style={{
                  fontSize: RFValue(12),
                  fontWeight: "400",
                  alignSelf: "center",
                  color: "grey",
                }}
              >
                {item.Address.split(",")[0]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default RESTAURANTLIST;
