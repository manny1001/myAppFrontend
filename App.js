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
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AppStack = lazy(() => import("./navigation/AppStack"));
const AuthStack = lazy(() => import("./navigation/AuthStack"));
const httpLink = createHttpLink({
  uri: "http://192.168.43.21:4000/graphql",
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
        Home: {
          path: "Home",
          initialRouteName: "Trip",
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
        Payments: {
          path: "Payments",
          screens: { Payments: "Payments" },
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
  return (
    <NavigationContainer
      linking={linkingApp}
      onReady={() => {
        console.log("I, ready!!!");
      }}
    >
      <Suspense fallback={Loader()}>
        <ApolloProvider client={client}>
          <ContextConsumer>
            {(context) => {
              return context.state.userToken === null ? (
                <AuthStack context={context} />
              ) : (
                <AppStack context={context} />
              );
            }}
          </ContextConsumer>
        </ApolloProvider>
      </Suspense>
    </NavigationContainer>
  );
};
export default App;
