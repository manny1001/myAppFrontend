import React, { Component, lazy } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ADDCARD } from "../Screens/AddBankCard";
const AddACard = ({
  logos,
  cardName,
  cardNumber,
  months,
  year,
  cvv,
  doneEditing,
}) => {
  return (
    <ADDCARD
      style={{
        height: hp(38),
        width: wp(85),
        alignSelf: "center",
      }}
      logos={logos}
      cardName={cardName}
      cardNumber={cardNumber}
      months={months}
      year={year}
      cvv={cvv}
      doneEditing={doneEditing}
    />
  );
};

export default AddACard;
