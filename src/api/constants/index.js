import React, { lazy, Suspense } from "react";
import Loader from "../../components/Loader";
import { Context, ContextConsumer } from "../../context/Context";
import Modal from "modal-enhanced-react-native-web";
import { useFonts } from "expo-font";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Dimensions } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import styles from "../../styles";
export const Profile = lazy(() => import("../../screens/Profile"));
export const Home = lazy(() => import("../../navigation/Home"));
export const Settings = lazy(() => import("../../navigation/More"));
export const AuthStack = lazy(() => import("../../navigation/Auth"));
export const TabIcon = lazy(() => import("../../components/TabIcon.js"));
export const Payments = lazy(() => import("../../screens/PaymentHistory.js"));
export const linkingApp = lazy(() => import("../../utilites/linking"));
export const CheckDataConnectionModal = lazy(() =>
  import("../../components/CheckDataConnectionModal")
);
export const PhoneAuth = lazy(() => import("../../screens/PhoneAuth"));
export const AcceptTandCs = lazy(() =>
  import("../../screens/TermsAndConditions")
);
export const Ride = lazy(() => import("../../screens/StartRide"));
export const TrackDriver = lazy(() => import("../../screens/TrackDriver"));
export const Rating = lazy(() => import("../../screens/Rating"));
export const Confirm = lazy(() => import("../../screens/Confirm"));
export const Payment = lazy(() => import("../../screens/PaymentProcess"));
export const AddName = lazy(() => import("../../screens/AddName"));

export const navigationRef = React.createRef();
export const routeNameRef = React.createRef();
const httpLink = createHttpLink({
  uri: "https://agile-woodland-33090.herokuapp.com/",
});
/* const httpLink = createHttpLink({
  uri: "http://localhost:22000/graphql",
}); */
export const Stack = createStackNavigator();
export const AppStack = createBottomTabNavigator();
export const AuthStackNavigator = createStackNavigator();

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "same-origin",
});
export {
  React,
  lazy,
  Suspense,
  ApolloProvider,
  View,
  Text,
  Dimensions,
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationContainer,
  NetInfo,
  Context,
  ContextConsumer,
  Modal,
  Loader,
  useFonts,
  styles,
};
