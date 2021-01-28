import React, { useEffect, useState, lazy } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
import { useQuery, useMutation } from "@apollo/client";
import { NEW_REQUEST, GET_PROFILE } from "../Queries";
const BigButton = lazy(() => import("../Components/Buttons"));
const PaymentButton = ({
  navigation,
  uuidTrip,
  PayOrConfirm,
  setselectedCard,
  paymentMethod,
  totalAmount,
  selectedValue,
}) => {
  console.log(totalAmount);
  return (
    <BigButton
      icon={<Icon name="Safety" size={24} color="black" />}
      disabled={!setselectedCard && selectedValue === "Card" ? true : false}
      buttonStyle={{
        width: wp(80),
        alignSelf: "center",
      }}
      titleStyle={{ fontWeight: "bold" }}
      title={
        paymentMethod === "Cash"
          ? "Confirm" + " " + "\n" + "R" + " " + totalAmount
          : "Pay" + " " + "\n" + "R" + " " + totalAmount
      }
      onPress={() => {
        PayOrConfirm({
          variables: {
            uuidTrip: uuidTrip,
            totalAmount: totalAmount,
            paymentMethod: paymentMethod,
          },
        });
        navigation.navigate("TrackDriver");
      }}
    />
  );
};

export default PaymentButton;
