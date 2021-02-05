import React, { lazy, Suspense } from "react";
import { Context, ContextConsumer } from "./Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";
import * as Linking from "expo-linking";
import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  return <App />;
};

export default Index;
