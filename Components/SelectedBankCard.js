import React, { Component, lazy } from "react";
import { View, Text, TouchableOpacity, Button, Modal } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Item } from "../Components/selectBankCard";
const SelectedBankCard = ({ setselectedCard }) => {
  return (
    <View
      style={{
        width: wp(70),
        height: hp(20),
        alignSelf: "center",
        justifyContent: "space-evenly",
      }}
    >
      {setselectedCard !== null && (
        <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
          You chose to pay with
        </Text>
      )}
      <Item
        touchable={false}
        height={hp(17)}
        title={setselectedCard.title}
        mm={setselectedCard.mm}
        cvv={setselectedCard.cvv}
        cardNumber={setselectedCard.cardNumber}
        cardName={setselectedCard.cardName}
      />
    </View>
  );
};

export default SelectedBankCard;
