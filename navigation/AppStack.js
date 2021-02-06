import React, { useState, lazy, Suspense } from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const ProfileStack = lazy(() => import("../navigation/ProfileStack"));
const HomeStack = lazy(() => import("../navigation/HomeStack"));
const SettingsStack = lazy(() => import("../navigation/SettingsStack"));
const PaymentsStack = lazy(() => import("../navigation/PaymentsStack"));

const Tabs = createBottomTabNavigator();
const AppStack = (props) => {
  const { context } = props;
  return (
    <Tabs.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          /* tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color="black" size={wp(5)} />
          ), */
        }}
      />
      <Tabs.Screen
        name="Payments"
        component={PaymentsStack}
        options={{
          tabBarLabel: "Payments",
          /*  tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={wp(5)} color="black" />
          ), */
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={() => <ProfileStack />}
        options={{
          tabBarLabel: "Profile",
          /* tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person-outline" color="#333" size={wp(5)} />
            ), */
        }}
      />
      <Tabs.Screen
        name="App"
        component={() => <SettingsStack context={context} />}
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
