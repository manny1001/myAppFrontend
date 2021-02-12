import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Settings = lazy(() => import("../Screens/Settings"));
const AddBankCard = lazy(() => import("../Screens/AddBankCard"));
const Feedback = lazy(() => import("../Screens/Feedback"));
const About = lazy(() => import("../Screens/About"));
const CardSettings = lazy(() => import("../Screens/CardSettings"));
const EditBankcard = lazy(() => import("../Screens/EditBankcard"));
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
        name="AddBankCard"
        component={AddBankCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardSettings"
        component={CardSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditBankcard"
        component={EditBankcard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default SettingsStack;
