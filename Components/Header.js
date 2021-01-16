import React from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TopHeader = ({
  Opacityvalue,
  backColor,
  LeftComponent,
  CenterComponent,
  RightComponent,
}) => {
  return (
    <>
      <Header
        backgroundColor={backColor ? backColor : "#f2f2f2"}
        containerStyle={{
          flexDirection: "row",
          zIndex: 100,
          height: hp(10),
        }}
        leftComponent={LeftComponent}
        centerComponent={CenterComponent}
        rightComponent={RightComponent}
      />
    </>
  );
};

export default TopHeader;

const styles = StyleSheet.create({});
