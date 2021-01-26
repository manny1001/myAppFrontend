import React, { useState } from "react";
import Header from "../Components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Picker } from "@react-native-picker/picker";
import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SelectBankCard from "../Components/selectBankCard";
import { reducer, initialState } from "../Context";
import BigButton from "../Components/Buttons.js";
export default function Checkout(props) {
  const [{ cart, isloggedIn }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const [selectedValue, setselectedValue] = useState("Select");
  const [paymentMethod, setpaymentMethod] = useState(null);
  const [isClicked, setisClicked] = useState(false);
  const [deliveryAddress, setdeliveryAddress] = useState(
    "22 Allan Road Glen Austin Midrand"
  );
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

  /*  const Restaurant = props.route.params.Restaurant; */
  const Restaurant = {
    id: 1,
    Name: "Debonairs",
    Contact: "013 879 9635",
    type: "FastFood",
    Logo: "",
    Address: "Halfway House Midrand, Shop 49 CarlsWald Shopping Centre, 1685",
    Operating_Hours: `daily from 9am–9pm`,
    Menu: [
      {
        id: "1",
        name: "Breakfast",
        menu: [
          {
            sizes: "S#M#L",
            id: "1",
            Hot: [
              {
                id: "5246415",
                title: "Nescafe",
                price: 12.0,
              },
              {
                id: "656562",
                title: "Hot Chocolate",
                price: 22.0,
              },
            ],
          },
        ],
      },
      {
        id: "2",
        name: "Lunch",
        menu: [
          {
            sizes: "S#M#L",
            id: "65465",
            Hot: [
              {
                id: "3226",
                title: "Nescafe",
                price: 12.0,
              },
              {
                id: "6266551",
                title: "Hot Chocolate",
                price: 22.0,
              },
            ],
          },
        ],
      },
      {
        id: "3",
        name: "Night Time",
        menu: [
          {
            sizes: "S#M#L",
            id: "65465",
            Hot: [
              {
                id: "3226",
                title: "Nescafe",
                price: 12.0,
              },
              {
                id: "6266551",
                title: "Hot Chocolate",
                price: 22.0,
              },
            ],
          },
        ],
      },
      {
        id: "4",
        name: "Burgers",
        menu: [
          {
            sizes: "S#M#L",
            id: "65465",
            Hot: [
              {
                id: "3226",
                title: "Nescafe",
                price: 12.0,
              },
              {
                id: "6266551",
                title: "Hot Chocolate",
                price: 22.0,
              },
            ],
          },
        ],
      },
      {
        id: "5",
        name: "Combos",
        menu: [
          {
            sizes: "S#M#L",
            id: "65465",
            Hot: [
              {
                id: "3226",
                title: "Nescafe",
                price: 12.0,
              },
              {
                id: "6266551",
                title: "Hot Chocolate",
                price: 22.0,
              },
            ],
          },
        ],
      },
      {
        id: "6",
        name: "Family",
        menu: [
          {
            sizes: "S#M#L",
            id: "65465",
            Hot: [
              {
                id: "3226",
                title: "Nescafe",
                price: 12.0,
              },
              {
                id: "6266551",
                title: "Hot Chocolate",
                price: 22.0,
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
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
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "#f2f2f2",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: wp(90),
            top: 0,
            marginTop: hp(11),
            borderRadius: 5,
            height: hp(6),
            backgroundColor: "#f2f2f2",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                marginLeft: wp(0),
                margin: wp(5),
                fontSize: RFValue(20),
                fontWeight: "bold",
              }}
            >
              Payment Method
            </Text>
            <Picker
              mode={"dropdown"}
              selectedValue={selectedValue}
              style={{
                height: hp(4),
                width: wp(20),
                borderRadius: wp(3),
                borderWidth: wp(0.3),
                justifyContent: "center",
                marginLeft: wp(5),
                marginTop: hp(1),
                alignSelf: "center",
                backgroundColor: "#f2f2f2",
              }}
              onValueChange={(itemValue, itemIndex) => {
                setselectedValue(itemValue), setpaymentMethod(itemValue);
              }}
            >
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Card" value="Card" />
            </Picker>
          </View>
        </View>
        {paymentMethod === "Cash" && (
          <View style={{ marginTop: hp(8) }}>
            <Text style={{ marginLeft: wp(7), marginBottom: hp(2) }}>
              You have chosen to pay cash, payment is due upon arrival.
            </Text>
          </View>
        )}
        {paymentMethod === "Card" && (
          <SelectBankCard props={props} style={{ marginTop: hp(8) }} />
        )}

        <View
          style={{
            width: wp(80),
            flexDirection: "column",
            justifyContent: "space-around",
            height: hp(7),
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              jusifycontent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: RFValue(16),
                alignSelf: "center",
              }}
            >
              Delivery:
            </Text>
          </View>

          <View
            style={{
              width: wp(80),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {isClicked === false ? (
              <View
                style={{
                  flexDirection: "row",
                  jusifycontent: "center",
                }}
              >
                <Text
                  style={{
                    marginLeft: wp(1),
                    fontWeight: "400",
                    alignSelf: "center",
                    fontSize: RFValue(14),
                  }}
                >
                  {deliveryAddress}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  jusifycontent: "center",
                  alignContent: "center",
                  alignItems: "flex-start",
                  marginLeft: wp(4),
                  height: hp(4),
                }}
              >
                {/*   <Entypo
                  name="location-pin"
                  size={24}
                  color="black"
                  style={{ alignSelf: "center" }}
                /> */}
                <GooglePlacesAutocomplete
                  keyboardShouldPersistTaps={true}
                  listViewDisplayed={false}
                  fetchDetails={true}
                  placeholder="Change location?..."
                  onPress={(data) => {
                    setdeliveryAddress(data.description);
                    setisClicked(false);
                  }}
                  query={{
                    key: "AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM",
                    language: "en",
                  }}
                  requestUrl={{
                    useOnPlatform: "web",
                    url:
                      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
                  }}
                  debounce={200}
                  styles={{
                    container: {
                      width: wp(55),
                      alignSelf: "center",
                    },
                    textInputContainer: {
                      width: wp(55),
                      backgroundColor: "transparent",
                      borderColor: null,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      height: hp(5),
                      color: "#5d5d5d",
                      fontSize: 16,
                    },
                  }}
                />
              </View>
            )}

            <TouchableOpacity
              onPress={() => setisClicked(!isClicked)}
              style={{ marginRight: wp(5), alignSelf: "center" }}
            >
              {isClicked === false
                ? {
                    /* <Feather
                  name="edit"
                  size={24}
                  color="black"
                  style={{ alignSelf: "center" }}
                /> */
                  }
                : {
                    /* <MaterialIcons
                  name="cancel"
                  size={24}
                  color="black"
                  style={{ alignSelf: "center" }}
                /> */
                  }}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            {
              width: wp(90),
              alignSelf: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              alignSelf: "center",
              borderRadius: 5,
              elevation: 10,
              height: hp(8),
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                height: hp(7),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  margin: 24,
                  fontSize: RFValue(20),
                  fontWeight: "bold",
                  textAlign: "flex-start",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  margin: 24,

                  fontSize: RFValue(18),
                  fontWeight: "400",
                  textAlign: "flex-start",
                }}
              >
                {DATA.reduce(function (sum, current) {
                  return sum + current.Price;
                }, 0)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            {
              width: wp(85),
              alignSelf: "center",
              height: hp(12),
              marginBottom: hp(1),
              justifyContent: "space-between",
            },
          ]}
        >
          <BigButton
            /* onPress={() =>
              dispatch({
                type: "ADD_TO_CART",
                item: DATA,
              })
            } */
            /* onPress={() => props.navigation.navigate("Confirmationpage")} */
            title={"Confirm Order"}
          />
          <BigButton
            /* onPress={() => cancel this guys order} */
            onPress={() => {}}
            title={"Cancel"}
          />
        </View>
      </View>
    </>
  );
}
