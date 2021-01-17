import React, { useState, lazy, Suspense } from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const AddName = lazy(() => import("../Screens/AddName"));
const AddEmail = lazy(() => import("../Screens/AddEmail"));
const EnterOTP = lazy(() => import("../Screens/EnterOTP"));
const PhoneAuth = lazy(() => import("../Screens/PhoneAuth"));
const Onboarding = lazy(() => import("../Screens/Onboarding"));
const AcceptTandCs = lazy(() => import("../Screens/AcceptTandCs"));
const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={(props) => <Onboarding {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddEmail"
        component={AddEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddName"
        component={AddName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AcceptTandCs"
        component={AcceptTandCs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EnterOTP"
        component={EnterOTP}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AuthStack;
