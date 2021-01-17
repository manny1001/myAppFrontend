//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectBankCard, { YOURCARDS } from "../Components/selectBankCard";
const YourBankCardsList = ({
  setcardselected,
  setselectedCard,
  closeModal,
  props,
}) => {
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
    />
  );
};

export default YourBankCardsList;
