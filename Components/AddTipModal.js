//import liraries
import React, { Component, lazy } from "react";
import { View, Text, TouchableOpacity, Button, Modal } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

import { TextInput } from "react-native-paper";
const BigButton = lazy(() => import("../Components/Buttons"));

const AddTipModal = ({ onBackdropPress, tipModalVisible, setTipAmont }) => {
  return (
    <Modal
      onBackdropPress={() => this.setState({ visibleModal: false })}
      backgroundColor="transparent"
      visible={tipModalVisible}
    >
      <View
        style={{
          backgroundColor: "#f5f5f5",
          height: hp(100),
          width: wp(100),
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: RFValue(22),
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Add a tip
        </Text>

        <View
          style={{
            width: wp(50),
            flexDirection: "row",
            alignSelf: "center",
            marginTop: hp(10),
            marginBottom: hp(10),
          }}
        >
          <Text
            style={{
              fontSize: RFValue(22),

              alignSelf: "center",
            }}
          >
            R
          </Text>
          <TextInput
            mode={"flat"}
            style={{
              marginTop: hp(2),
              marginLeft: wp(7),
              width: wp(30),
              backgroundColor: "transparent",
              color: "black",
              fontSize: RFValue(16),
              height: hp(5),
              alignSelf: "center",
            }}
            onChangeText={(text) => {
              {
                text === "" && setTipAmont;
              }
              {
                text !== "" && this.setState({ tipAmount: parseFloat(text) });
              }
            }}
          />
        </View>
        <BigButton
          disabled={this.state.tipAmount === 0 ? true : false}
          onPress={() => {
            this.setState({ tipModalVisible: false }),
              this.setState({ tipAdded: true }),
              this.setState({
                totalAmount: this.state.tipAmount + this.state.tripFee,
              });
          }}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
          title={"Add"}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ tipAmount: 0 }),
              this.setState({ tipModalVisible: false });
          }}
          style={{
            marginTop: hp(5),

            position: "absolute",
            top: 0,
            marginLeft: wp(10),
          }}
        >
          {/*  <MaterialIcons name="cancel" size={wp(10)} color="black" /> */}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddTipModal;
