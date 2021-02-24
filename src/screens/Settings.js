import React, { lazy } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";
const SettingsPresentational = lazy(() =>
  import("../components/SettingsPresentational")
);
const AysncLogout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    return true;
  } catch (e) {
    return false;
  }
};
const Usersettings = (props) => {
  const DATA = [
    /* {
      id: "1",
      icon: <View style={styles.iconStyle}></View>,
      title: "Notifications",
    }, */
    {
      id: "2",
      icon: <View style={styles.iconStyle}></View>,
      title: "Feedback",
    },
    {
      id: "3",
      icon: <View style={styles.iconStyle}></View>,
      title: "About",
    },
  ];
  return (
    <SettingsPresentational
      props={props}
      DATA={DATA}
      AysncLogout={() => AysncLogout()}
    />
  );
};

export default Usersettings;
