import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Ride = lazy(() => import("../screens/StartRide"));
const TrackDriver = lazy(() => import("../screens/TrackDriver"));
const Rating = lazy(() => import("../screens/Rating"));
const Confirm = lazy(() => import("../screens/Confirm"));
const Payment = lazy(() => import("../screens/PaymentProcess"));
const AddName = lazy(() => import("../screens/AddName"));
import { ContextConsumer } from "../../src/context/Context";
const HomeStack = (props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Ride">
      <Stack.Screen
        name="Ride"
        component={() => <Ride {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirm"
        component={(props) => (
          <ContextConsumer>
            {(context) => <Confirm context={context} {...props} />}
          </ContextConsumer>
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Payment"
        component={(props) => (
          <ContextConsumer>
            {(context) => <Payment context={context} props={props} />}
          </ContextConsumer>
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddName"
        component={AddName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackDriver"
        component={TrackDriver}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
