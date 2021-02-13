import React, { useState, lazy, Suspense } from "react";
import { Dimensions, TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
/* import Header from "../../src/components/Header"; */
const Ride = lazy(() => import("../screens/StartRide"));
const TrackDriver = lazy(() => import("../screens/TrackDriver"));
const Rating = lazy(() => import("../screens/Rating"));
const Confirm = lazy(() => import("../screens/Confirm"));
const Payment = lazy(() => import("../screens/PaymentProcess"));
const AddName = lazy(() => import("../screens/AddName"));
import { Header } from "react-native-elements";

import { ContextConsumer } from "../../src/context/Context";
const HomeStack = (props) => {
  const windowWidth = Dimensions.get("window").width;
  console.log(props.navigation);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Ride">
      <Stack.Screen
        name="Ride"
        component={() => <Ride {...props} />}
        options={{
          headerShown: windowWidth < 768 ? false : true,
          header: () => (
            <Header
              leftComponent={
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.openDrawer();
                  }}
                >
                  <Text>Open</Text>
                </TouchableOpacity>
              }
              centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
              rightComponent={{ icon: "home", color: "#fff" }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{ headerShown: windowWidth < 768 ? false : true }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{ headerShown: windowWidth < 768 ? false : true }}
      />

      <Stack.Screen
        name="Payment"
        component={(props) => (
          <ContextConsumer>
            {(context) => <Payment context={context} props={props} />}
          </ContextConsumer>
        )}
        options={{ headerShown: windowWidth < 768 ? false : true }}
      />
      <Stack.Screen
        name="AddName"
        component={AddName}
        options={{ headerShown: windowWidth < 768 ? false : true }}
      />
      <Stack.Screen
        name="TrackDriver"
        component={TrackDriver}
        options={{ headerShown: windowWidth < 768 ? false : true }}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
