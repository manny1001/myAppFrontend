//import liraries
import React, { lazy } from "react";
import { Image, Text, StyleSheet } from "react-native";
import styles from "../styles/index.js";
import { MaterialIcons } from "@expo/vector-icons";
const TabIcon = ({ name, color, size }) => {
  return (
    <MaterialIcons
      name={name}
      size={26}
      color="black"
      style={styles.tabIconStyle}
    />
  );
};

export default TabIcon;
