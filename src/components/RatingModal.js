//import liraries
import React, { lazy } from "react";
import { View, Text, StyleSheet } from "react-native";
const RatingScreen = lazy(() => import("../screens/Rating.js"));
import Modal from "modal-enhanced-react-native-web";

const RatingModal = ({ onPress, RatingModalVIsibile }) => {
  return (
    <Modal isVisible={RatingModalVIsibile} onBackdropPress={() => {}}>
      <RatingScreen onPress={onPress} />
    </Modal>
  );
};

export default RatingModal;
