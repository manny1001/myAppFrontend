//import liraries
import React, { lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "modal-enhanced-react-native-web";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
const BigButton = lazy(() => import("../components/Buttons"));

const StandByForCallModal = ({
  setmodalVisible,
  setDriverArrived,
  modalVisible,
}) => {
  return (
    <Modal
      backgroundColor={"#f2f2f2"}
      isVisible={modalVisible}
      onBackdropPress={() => setmodalVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
        }}
      >
        <Text
          style={{
            fontSize: RFPercentage(5),
            alignSelf: "center",
            width: wp(75),
          }}
        >
          One of our call center agents will get back to you within the next 5
          mins
        </Text>
        <BigButton
          onPress={() => {
            setmodalVisible(false), setDriverArrived(false);
          }}
          title={"Okay"}
          titleStyle={{
            fontWeight: "bold",
            fontSize: RFPercentage(3),
          }}
          containerStyle={{
            top: hp(20),
          }}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
          }}
        />
      </View>
    </Modal>
  );
};

export default StandByForCallModal;
