//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectBankCard, { YOURCARDS } from "../Components/selectBankCard";
const YourBankCardsList = ({
  selectedcard,
  setcardselected,
  setselectedCard,
  closeModal,
  props,
}) => {
  console.log(selectedcard, "SJDHKJ");
  return (
    <SelectBankCard
      style={{
        alignSelf: "center",
        justifyContent: "center",
      }}
      setcardselected={setcardselected}
      setselectedCard={setselectedCard}
      props={props}
      closeModal={closeModal}
      selectedcard={selectedcard}
    />
  );
};

export default YourBankCardsList;
