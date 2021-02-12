import React, { useState, lazy, Suspense } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import Modal from "modal-enhanced-react-native-web";
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
const AppStack = lazy(() => import("./navigation/AppStack"));
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
    Main: {
      path: "Main",
      screens: {
        HomeStack: {
          path: "HomeStack",
          screens: {
            TrackDriver: { path: "TrackDriver" },
            Confirm: { path: "Confirm" },
            RatingScreen: { path: "RatingScreen" },
            Confirmationpage: { path: "Confirmationpage" },
            Trip: { path: "Trip" },
            Payment: { path: "Payment" },
            AddName: { path: "AddName" },
          },
        },
        Payments: {
          path: "Payments",
          screens: { Payments: "Payments" },
        },
        Profile: { path: "Profile" },
        Settings: {
          path: "Settings",
          screens: {
            Settings: "Settings",
            About: "About",
            AddBankCard: "AddBankCard",
            Feedback: "Feedback",
            CardSettings: "CardSettings",
            EditBankcard: "EditBankcard",
          },
        },
      },
    },
    AuthStack: {
      path: "AuthStack",
      Screens: {
        AcceptTandCs: "AcceptTandCs",
        PhoneAuth: "PhoneAuth",
        EnterOTP: "EnterOTP",
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
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Main"
                        component={AppStack}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
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
