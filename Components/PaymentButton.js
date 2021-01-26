import React, { useEffect, useState, lazy } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
const BigButton = lazy(() => import("../Components/Buttons"));
const PaymentButton = ({
  loading,
  data,
  setselectedCard,
  paymentMethod,
  totalAmount,
  selectedValue,
}) => {
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
          ? "Confirm" + " " + "\n" + "R" + " " + totalAmount.toFixed(2)
          : "Pay" + " " + "\n" + "R" + " " + totalAmount.toFixed(2)
      }
      onPress={() => {
        newTripRequest({
          variables: {
            username: JSON.stringify(User.currentUser.username),
            cellphone: JSON.stringify(User.currentUser.cellphone),
            location: JSON.stringify(location),
            destination: JSON.stringify(destination),
            paymentmethod: "Card",
          },
        });
        /*  props.navigation.navigate("TrackDriver"); */
      }}
    />
  );
};

export default PaymentButton;
