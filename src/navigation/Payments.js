import React, { useState, lazy, Suspense } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, TouchableOpacity, Text } from "react-native";
const AddName = lazy(() => import("../screens/AddName"));
import { Header } from "react-native-elements";
const Payments = lazy(() => import("../screens/PaymentHistory.js"));
const PaymentsStack = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payments"
        component={Payments}
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
    </Stack.Navigator>
  );
};

export default PaymentsStack;
