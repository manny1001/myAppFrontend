import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Ride = lazy(() => import("../Screens/Ride.js"));
const Landing = lazy(() => import("../Screens/Landing"));
const Food = lazy(() => import("../Screens/Menu"));
const Restaurants = lazy(() => import("../Screens/Restaurants"));
const Confirmationpage = lazy(() => import("../Screens/Confirmationpage"));
const Cart = lazy(() => import("../Screens/Cart"));
const Checkout = lazy(() => import("../Screens/Checkout"));
const Rating = lazy(() => import("../Screens/Rating"));
const ProductItem = lazy(() => import("../Screens/ProductItem"));
const Confirm = lazy(() => import("../Screens/Confirm"));
const Payment = lazy(() => import("../Screens/Payment"));
const AddName = lazy(() => import("../Screens/AddName"));
const TrackDriver = lazy(() => import("../Screens/TrackDriver"));
import { ContextConsumer } from "../Context";
const HomeStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"Trip"}>
      {/* <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="TrackDriver"
        component={TrackDriver}
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
        name="RatingScreen"
        component={Rating}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductItem"
        component={ProductItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirmationpage"
        component={Confirmationpage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Restaurants"
        component={Restaurants}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Trip"
        component={Ride}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Food"
        component={Food}
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
    </Stack.Navigator>
  );
};
export default HomeStack;
