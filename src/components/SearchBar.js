import React, { Component, useState } from "react";
import { SearchBar } from "react-native-elements";
import { widthPercentageToDP } from "react-native-responsive-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AppSearchBar = ({
  searchFor,
  searchIcon,
  clearIcon,
  onPress,
  containerStyle,
}) => {
  const [search, setsearch] = useState("");
  const updateSearch = (search) => {
    setsearch(search);
  };

  return (
    <SearchBar
      containerStyle={containerStyle}
      inputContainerStyle={{ fontSize: 2 }}
      clearIcon={{/* <MaterialIcons name="clear" size={24} color="black" /> */}}
      searchIcon={searchIcon}
      lightTheme
      style={{ borderRadius: 500, backgroundColor: "transparent" }}
      placeholder={"Search " + searchFor}
      onChangeText={updateSearch}
      value={search}
    />
  );
};

export default AppSearchBar;
