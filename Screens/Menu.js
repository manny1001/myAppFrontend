import React, { useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  SafeAreaView,
  View,
  ScrollView,
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
import Header from "../Components/Header";
import Modal from "modal-enhanced-react-native-web";

import DETA, { BIGDATA } from "./DETA";
import { RFValue } from "react-native-responsive-fontsize";
import Restaurants from "./Restaurants";
import { useLinkTo } from "@react-navigation/native";
import { reducer, initialState } from "../Context";
const App = (props) => {
  const [isClicked, setisClicked] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);
  const [visibleModal, setvisibleModal] = useState(false);
  const [itemObject, setitemObject] = useState([]);
  const [deliveryAddress, setdeliveryAddress] = useState(
    "22 Allan Road Glen Austin Midrand"
  );
  const Restaurant = props.route.params.RestaurantInfo;
  const [{ restaurant, cart, isloggedIn }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const ItemView = (item, key) => {
    return (
      <View
        key={key}
        style={styles.item}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}
      >
        <Text style={styles.itemStyle}>{item.name}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            numColumns={3}
            data={DETA[key].menu}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setitemObject(DETA[key].menu[item.id - 1]),
                    props.navigation.navigate("ProductItem", {
                      itemObject: DETA[key].menu[item.id - 1],
                    });
                }}
                style={{
                  width: hp(20),
                  height: hp(20),
                  backgroundColor: "transparent",
                  borderColor: "black",
                  elevation: 50,
                  margin: 5,
                }}
              >
                <Image style={{ flex: 1 }} source={item.image} />
                <Text style={{}}>{item.title}</Text>
                <Text style={{}}>{item.price}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <View
          style={{
            height: 0.5,
            width: "100%",
            backgroundColor: "#C8C8C8",
            marginTop: hp(2),
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        RightComponent={
          <TouchableOpacity>
            {/* <Entypo
              style={{ marginRight: wp(6) }}
              name="shopping-bag"
              size={wp(7)}
              color="black"
              onPress={() =>
                props.navigation.navigate("Cart", {
                  RestaurantInfo: Restaurant,
                })
              }
            /> */}
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        {/* <View
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
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: wp(30),
                justifyContent: "flex-start",
                marginTop: hp(4),
              }}
            >
              <Feather name="phone-call" size={wp(5)} color="black" />
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: "grey",
                  marginLeft: wp(2),
                }}
              >
                {Restaurant.Contact}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",

            alignItems: "center",
          }}
          style={{
            flexDirection: "row",
            width: wp(90),
            alignSelf: "center",
          }}
          decelerationRate={9000}
          snapToEnd={true}
          snapToInterval={5}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {BIGDATA[0].Menu.map((thing, index) => (
            <TouchableOpacity
              onPress={() => {
                setScrollToIndex(index);
                if (dataSourceCords.length > scrollToIndex) {
                  ref.scrollTo({
                    x: 0,
                    y: dataSourceCords[index],
                    animated: true,
                  });
                } else {
                  alert("Out of Max Index");
                }
              }}
              style={{
                borderColor: "gray",
                borderWidth: 2,
                borderRadius: 50,
                padding: 10,
                marginLeft: 5,
                justifyContent: "center",
              }}
            >
              <Text key={index}> {thing.name} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={{ height: hp(55) }}
          ref={(ref) => {
            setRef(ref);
          }}
        >
          {DETA.map(ItemView)}
          <Text
            style={{
              fontSize: wp(4),

              color: "grey",
            }}
          >
            Operating Hours: We are open {Restaurant.Operating_Hours}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemStyle: {
    padding: 10,
    fontSize: 20,
  },

  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#1e73be",
    padding: 5,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  searchButton: {
    padding: 15,
    backgroundColor: "#f4801e",
  },
  searchButtonText: {
    color: "#fff",
  },
});

export default App;
