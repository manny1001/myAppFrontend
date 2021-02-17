import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, TouchableOpacity, Text } from "react-native";
const AddName = lazy(() => import("../screens/AddName"));
const Payments = lazy(() => import("../screens/PaymentHistory.js"));
const PaymentsStack = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PaymentsStack;
