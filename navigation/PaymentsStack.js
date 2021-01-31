import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Payments = lazy(() => import("../Screens/Payments"));
const PaymentsStack = (props) => {
  const Stack = createStackNavigator();
  const { context } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payments"
        component={(props) => <Payments {...props} context={context} />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PaymentsStack;
