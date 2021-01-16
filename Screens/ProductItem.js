import React, { Component } from "react";
import { Text, Image, View, TouchableOpacity, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { RFValue } from "react-native-responsive-fontsize";
import Header from "../Components/Header";
import { reducer, initialState } from "../Context";
import BigButton from "../Components/Buttons.js";
class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Qty: 0, NewOrder: [] };
  }

  AddQty = () => {
    this.setState({ Qty: this.state.Qty + 1 });
  };
  SubtractQty = () => {
    if (this.state.Qty !== 0) {
      this.setState({ Qty: this.state.Qty - 1 });
    }
  };
  render() {
    const { itemObject } = this.props.route.params;
    return (
      <>
        <Header
          backColor={"transparent"}
          LeftComponent={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              {/*  <MaterialIcons
                name="cancel"
                size={wp(7)}
                color="black"
                style={{ marginLeft: wp(6) }}
              /> */}
            </TouchableOpacity>
          }
          CenterComponent={
            <Text
              style={{
                fontSize: RFValue(18),

                color: "black",
              }}
            >
              Add to cart
            </Text>
          }
          RightComponent={
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Cart", {
                  RestaurantInfo: itemObject,
                })
              }
            >
              {/*  <Entypo
                style={{ marginRight: wp(6) }}
                name="shopping-bag"
                size={wp(7)}
                color="black"
              /> */}
            </TouchableOpacity>
          }
        />
        <View
          style={{
            height: hp(100),
            width: wp(100),

            flexDirection: "column",
          }}
        >
          <View
            style={{
              width: wp(90),
              height: hp(20),
              justifyContent: "center",

              alignSelf: "center",
            }}
          >
            <Image
              style={{
                alignSelf: "center",
                width: wp(90),
                height: hp(20),
                resizeMode: "contain",
              }}
              source={itemObject.image}
            />
          </View>
          <View
            style={{
              width: wp(90),
              height: hp(40),
              alignSelf: "flex-start",
              alignSelf: "center",
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{
                flex: 1,
                width: wp(90),

                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: RFValue(15), alignSelf: "center" }}>
                scscscs{itemObject.id}
              </Text>
            </ScrollView>
          </View>

          <View
            style={{
              width: wp(90),
              height: hp(20),

              justifyContent: "space-around",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: wp(80),
                height: hp(5),
                justifyContent: "space-around",
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => this.SubtractQty()}
                style={{
                  flexDirection: "row",
                  width: hp(10),
                  height: hp(10),
                  borderRadius: hp(5),
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                {/*   <Foundation
                  name="minus"
                  size={wp(7)}
                  color="black"
                  style={{
                    alignSelf: "center",
                  }}
                /> */}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  width: hp(5),
                  height: hp(5),
                  borderRadius: hp(5),
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: wp(9),
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.Qty}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.AddQty()}
                style={{
                  flexDirection: "row",
                  width: hp(10),
                  height: hp(10),
                  justifyContent: "center",
                  borderRadius: hp(5),
                  alignSelf: "center",
                }}
              >
                {/* <Foundation
                  name="plus"
                  size={wp(7)}
                  color="black"
                  style={{
                    alignSelf: "center",
                  }}
                /> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: wp(90),
                marginTop: hp(1),
                alignSelf: "center",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <BigButton
                buttonStyle={{
                  height: hp(10),
                  width: wp(80),
                  alignSelf: "center",
                }}
                onPress={() => {}}
                title={"Add"}
                style={{ alignSelf: "flex-end" }}
              />
              {/*  <Button
                onPress={() => {
                  this.props.navigation.navigate("Cart", {
                    RestaurantInfo: this.props.itemObject,
                  });
                }}
                title={"Cart"}
                style={{ alignSelf: "flex-end" }}
              /> */}
            </View>
          </View>
        </View>
      </>
    );
  }
}
export default function (props) {
  const [{ restaurant, cart, isloggedIn }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  const linkTo = useLinkTo();
  return (
    <ProductItem
      {...props}
      linkTo={linkTo}
      dispatch={dispatch}
      restaurant={restaurant}
    />
  );
}
