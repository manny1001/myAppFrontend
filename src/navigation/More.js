import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Settings = lazy(() => import("../../src/screens/Settings"));

const Feedback = lazy(() => import("../../src/screens/Feedback"));
const About = lazy(() => import("../../src/screens/About"));

const SettingsStack = (props) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={(props) => <Settings {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default SettingsStack;
