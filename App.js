import React, { useState, lazy, Suspense } from "react";
import { Context, ContextConsumer } from "./Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import * as Linking from "expo-linking";
import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Profile = lazy(() => import("./navigation/ProfileStack"));
const Home = lazy(() => import("./navigation/HomeStack"));
const Settings = lazy(() => import("./navigation/SettingsStack"));
const Payments = lazy(() => import("./navigation/PaymentsStack"));
const AppStack = createBottomTabNavigator();
const AuthStack = lazy(() => import("./navigation/AuthStack"));
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "same-origin",
});
const prefix = Linking.makeUrl("/");
const linkingApp = {
  prefixes: [prefix],
  config: {
    AppStack: {
      path: "AppStack",
      screens: {
        HomeStack: {
          path: "home",
          initialRouteName: "AddName",
          screens: {
            Landing: { path: "Landing" },
            Restaurants: {
              path: "Restaurants",
            },
            Food: {
              path: "Food/:item",
              parse: {
                item: (item) => {
                  item;
                },
              },
            },
            getaride: { path: "getaride" },
            Cart: { path: "Cart" },
            Confirmationpage: { path: "Confirmationpage" },
            Checkout: { path: "Checkout" },
            ConfirmRide: { path: "ConfirmRide" },
            ProductItem: { path: "ProductItem" },
            TripPayment: { path: "TripPayment" },
            AddName: { path: "AddName" },
            AddEmail: { path: "AddEmail" },
            TrackDriver: { path: "TrackDriver" },
          },
        },
        Profile: { path: "Profile" },
        SettingsStack: {
          path: "Settings",
          screens: {
            AddBankCard: "AddBankCard",
            Feedback: "Feedback",
            About: "About",
            CardSettings: "CardSettings",
            EditBankcard: "EditBankcard",
          },
        },
        PaymentsStack: { path: "payments", screens: { Orders: "Orders" } },
      },
    },
    AuthStack: {
      path: "AuthStack",
      Screens: {
        Onboarding: "Onboarding",
        PhoneAuth: "PhoneAuth",
        AddEmail: "AddEmail",
        AddName: "AddName",
        EnterOTP: "EnterOTP",
        AcceptTandCs: "AcceptTandCs",
      },
    },
  },
};

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer linking={linkingApp}>
      <ApolloProvider client={client}>
        <Context>
          <ContextConsumer>
            {(context) => {
              return (
                <Suspense fallback={Loader()}>
                  {context.state.userToken == null ? (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Auth"
                        component={AuthStack}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  ) : (
                    <AppStack.Navigator
                      tabBarOptions={{
                        keyboardHidesTabBar: true,
                      }}
                    >
                      <AppStack.Screen
                        name="Home"
                        component={Home}
                        options={{
                          tabBarLabel: "Home",
                          /* tabBarIcon: ({ color, size }) => (
                          <Octicons name="home" color="black" size={wp(5)} />
                        ), */
                        }}
                      />
                      <AppStack.Screen
                        name="Payments"
                        component={Payments}
                        options={{
                          tabBarLabel: "Payments",
                          /*  tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="attach-money" size={wp(5)} color="black" />
                        ), */
                        }}
                      />
                      <AppStack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                          tabBarLabel: "Profile",
                          /* tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person-outline" color="#333" size={wp(5)} />
                          ), */
                        }}
                      />
                      <AppStack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                          tabBarLabel: "More",
                          /*  tabBarIcon: ({ color, size }) => (
                          <Feather name="settings" color="#333" size={wp(5)} />
                        ), */
                        }}
                      />
                    </AppStack.Navigator>
                  )}
                </Suspense>
              );
            }}
          </ContextConsumer>
        </Context>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
