import React, { useState, lazy, Suspense } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Profile = lazy(() => import("../navigation/ProfileStack"));
const Home = lazy(() => import("../navigation/HomeStack"));
const Settings = lazy(() => import("../navigation/SettingsStack"));
const Payments = lazy(() => import("../navigation/PaymentsStack"));

const Tabs = createBottomTabNavigator();
const AppStack = ({ context }) => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          /* tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color="black" size={wp(5)} />
          ), */
        }}
      />
      <Tabs.Screen
        name="Payments"
        component={Payments}
        options={{
          tabBarLabel: "Payments",
          /*  tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={wp(5)} color="black" />
          ), */
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          /* tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person-outline" color="#333" size={wp(5)} />
            ), */
        }}
      />
      <Tabs.Screen
        name="App"
        component={() => <Settings context={context} />}
        options={{
          tabBarLabel: "More",
          /*  tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color="#333" size={wp(5)} />
          ), */
        }}
      />
    </Tabs.Navigator>
  );
};
export default AppStack;
