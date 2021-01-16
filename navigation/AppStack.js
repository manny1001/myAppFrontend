import React, { useState, lazy, Suspense } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const ProfileStack = lazy(() => import("../navigation/ProfileStack"));
const HomeStack = lazy(() => import("../navigation/HomeStack"));
const SettingsStack = lazy(() => import("../navigation/SettingsStack"));
const PaymentsStack = lazy(() => import("../navigation/PaymentsStack"));

const Tabs = createBottomTabNavigator();
const AppStack = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          /* tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color="black" size={wp(5)} />
          ), */
        }}
      />
      <Tabs.Screen
        name="PaymentsStack"
        component={PaymentsStack}
        options={{
          tabBarLabel: "Payments",
          /*  tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" size={wp(5)} color="black" />
          ), */
        }}
      />
      <Tabs.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          /*  tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color="#333" size={wp(5)} />
          ), */
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          /* tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" color="#333" size={wp(5)} />
          ), */
        }}
      />
    </Tabs.Navigator>
  );
};
export default AppStack;
