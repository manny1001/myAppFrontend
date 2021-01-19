import React, { lazy } from "react";
import { View } from "react-native";
const LandingPageTitle = lazy(() => import("../Components/LandingPageTitle"));
const LandingPageButton = lazy(() => import("../Components/LandingpageButton"));
const LandingPage = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <LandingPageButton {...props} />
    </View>
  );
};

export default LandingPage;
