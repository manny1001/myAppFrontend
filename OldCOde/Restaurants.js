import React, { useState } from "react";

import { StatusBar, Text } from "react-native";
import { RESTAURANTLIST } from "../Components/Carousel";
import { DATA3 } from "./FakeData";
import Header from "../Components/Header";
import { RFValue } from "react-native-responsive-fontsize";
/* import { reducer, initialState } from "../Context"; */
const Restaurants = (props) => {
  const [CategoriesArray, setCategoriesArray] = useState([]);
  /* const [{ restaurant, cart, isloggedIn }, dispatch] = React.useReducer(
    reducer,
    initialState
  ); */
  /* 
  const FETCHDATA = async () =>
    await fetch("http://192.168.43.182:3003/category", {
      method: "GET",
    })
      .then((response) => response.json())

      .then((responseJson) => {
        setCategoriesArray(responseJson);
      })

      .catch((error) => {
        console.error(error);
      });
  useEffect(() => {
    FETCHDATA();
  }); */
  return (
    <>
      <StatusBar
        backgroundColor={"white"}
        barStyle={"dark-content"}
        translucent={false}
      />
      <RESTAURANTLIST
        dispatch={dispatch}
        restaurant={restaurant}
        CarousalData={DATA3}
        props={props}
      />
    </>
  );
};
export default Restaurants;
