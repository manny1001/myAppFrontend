import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Payments = lazy(() => import("../Screens/Payments"));
const PaymentsStack = (props) => {
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
