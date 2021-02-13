import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLinkTo } from "@react-navigation/native";
import Header from "../Components/Header";
import Modal from "modal-enhanced-react-native-web";

import BigButton from "../Components/Buttons.js";

import { RFValue } from "react-native-responsive-fontsize";

const Cart = (props) => {
  const Restaurant = props.route.params.RestaurantInfo;
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      Name: "Classic Cheese Burger",
      Quantity: 2,
      Price: 12.84,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      Name: "American Beef Burger",
      Quantity: 1,
      Price: 48.0,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      Name: "Chicken wings Basket",
      Quantity: 5,
      Price: 55.0,
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      Name: "Classic Cheese Burger",
      Quantity: 2,
      Price: 12.84,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      Name: "American Beef Burger",
      Quantity: 1,
      Price: 48.0,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      Name: "Chicken wings Basket",
      Quantity: 5,
      Price: 55.0,
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      Name: "Classic Cheese Burger",
      Quantity: 2,
      Price: 12.84,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      Name: "American Beef Burger",
      Quantity: 1,
      Price: 48.0,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      Name: "Chicken wings Basket",
      Quantity: 5,
      Price: 55.0,
    },
  ];
  const renderItem = ({ item }) => (
    <>
      <List.Item
        onPress={() => {}}
        title={item.Quantity + " " + item.Name}
        titleStyle={{ fontWeight: "bold" }}
        descriptionStyle={{
          fontWeight: "bold",
          right: 0,
          position: "absolute",
        }}
        description={"R" + " " + item.Price}
      />
    </>
  );
  const linkTo = useLinkTo();
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-around" }}>
      <Header
        backColor={"transparent"}
        LeftComponent={
          <Image
            source={Restaurant.Logo}
            style={{
              marginLeft: wp(5),
              width: wp(10),
              height: hp(10),
              resizeMode: "contain",
            }}
          />
        }
        CenterComponent={
          <>
            <Text
              style={{
                fontSize: RFValue(18),

                color: "black",
              }}
            >
              {Restaurant.Name}
            </Text>
            <Text
              style={{
                fontSize: RFValue(16),
                color: "grey",
              }}
            >
              {Restaurant.Address.split(" ")[0].length > 3 &&
                Restaurant.Address.split(" ")[0]}{" "}
              {Restaurant.Address.split(" ")[1].length > 3 &&
                Restaurant.Address.split(" ")[1]}{" "}
              {Restaurant.Address.split(" ")[2].length > 3 &&
                Restaurant.Address.split(" ")[2]}{" "}
            </Text>
          </>
        }
      />
      {/*  <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          height: hp(15),
          justifyContent: "space-around",
          width: wp(100),
          alignSelf: "center",
        }}
      >
          <Image
          source={Restaurant.Logo}
          style={{ width: wp(30), height: hp(15), resizeMode: "contain" }}
        />

        <View
          style={{
            flexDirection: "column",
            width: wp(50),
            height: hp(13),
            zIndex: 2,
            alignSelf: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: wp(4),

              color: "maroon",
            }}
          >
            {Restaurant.type}
          </Text>
          <Text
            style={{
              fontSize: wp(6),

              color: "black",
            }}
          >
            {Restaurant.Name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: wp(4),

                color: "grey",
              }}
            >
              {Restaurant.Address}
            </Text>
          </View>
        </View>
      </View>
      */}
      <Text
        style={{ alignSelf: "center", fontSize: RFValue(22), width: wp(80) }}
      >
        Your cart
      </Text>
      <View
        style={{
          alignSelf: "center",
          height: hp(50),
          width: wp(90),
          marginTop: hp(2),
        }}
      >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          width: wp(90),

          height: hp(13),
          alignSelf: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <BigButton
          onPress={() =>
            props.navigation.navigate("Food", { Restaurant: Restaurant })
          }
          title={"Add more"}
          style={{ alignSelf: "flex-end" }}
        />
        <BigButton
          /* onPress={() => cancel this guys order} */
          onPress={() => {
            props.navigation.navigate("Payment", {
              Restaurant: Restaurant,
              from: "order",
            });
          }}
          title={"Checkout"}
          style={{ alignSelf: "flex-end" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Cart;
