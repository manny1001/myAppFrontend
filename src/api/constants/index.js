import React, { lazy, Suspense, useState, Component } from "react";
import Loader from "../../components/Loader";
import { Context, ContextConsumer } from "../../context/Context";
import { useMutation, useQuery } from "@apollo/client";
import { AirbnbRating, Button } from "react-native-elements";
import Modal from "modal-enhanced-react-native-web";
import { useFonts } from "expo-font";
import * as WebBrowser from "expo-web-browser";
import * as Location from "expo-location";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import { setContext } from "@apollo/client/link/context";
import {
  NEW_REQUEST,
  GET_DRIVERS,
  GET_DRIVER_RESPONSE,
  PAYMENT_CONFIRMATION,
  GET_CARD_PAYMENT_RESULT,
  CREATE_CHECKOUT,
  DRIVERS_LIVELOCATION,
  ALERT_EMAIL,
  GET_REQUEST_HISTORY,
  GET_USER_UUID,
  GET_PROFILE,
  UPDATE_PROFILE,
  USER_LOGIN,
  UPDATE_USERNAME,
} from "../../utilites/Queries";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Keyboard,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Avatar, Image } from "react-native-elements";
import styles from "../../styles";
import { StoreData, GetData } from "../../utilites/GFunctions";
import { getTripInfo, getlocation } from "../../utilites/utilities";
import { LoadingContent } from "../../components/Loader";
import { StackActions } from "@react-navigation/native";
export const InputField = lazy(() => import("../../components/TextInput"));
export const Profile = lazy(() => import("../../screens/Profile"));
export const Home = lazy(() => import("../../navigation/Home"));
export const More = lazy(() => import("../../navigation/More"));
export const AuthStack = lazy(() => import("../../navigation/Auth"));
export const TabIcon = lazy(() => import("../../components/TabIcon.js"));
export const Payments = lazy(() => import("../../screens/PaymentHistory.js"));
export const Settings = lazy(() => import("../../screens/Settings"));
export const SettingsPresentational = lazy(() =>
  import("../../components/SettingsPresentational")
);

export const AcceptTermsButton = lazy(() =>
  import("../../components/AcceptTermsButton")
);
export const AcceptTermsImage = lazy(() =>
  import("../../components/AcceptTermsImage")
);
export const Feedback = lazy(() => import("../../screens/Feedback"));
export const About = lazy(() => import("../../screens/About"));
export const linkingApp = lazy(() => import("../../utilites/linking"));
export const CheckDataConnectionModal = lazy(() =>
  import("../../components/CheckDataConnectionModal")
);
export const PhoneAuth = lazy(() => import("../../screens/PhoneAuth"));
export const Destination = lazy(() => import("../../components/Destination"));
export const AcceptTandCs = lazy(() =>
  import("../../screens/TermsAndConditions")
);
export const BigButton = lazy(() => import("../../components/Buttons"));
export const TimeAndDistance = lazy(() =>
  import("../../components/TimeAndDistance")
);
export const ConfrimPresentational = lazy(() =>
  import("../../components/ConfrimPresentational")
);
export const Ride = lazy(() => import("../../screens/StartRide"));
export const SwitchPaymentTypeButton = lazy(() =>
  import("../../components/SwitchPaymentTypeButton")
);
export const TrackDriver = lazy(() => import("../../screens/TrackDriver"));
export const Rating = lazy(() => import("../../screens/Rating"));
export const PaymentButton = lazy(() =>
  import("../../components/PaymentButton")
);
export const SelectPaymentMethod = lazy(() =>
  import("../../components/SelectPaymentMethod")
);
export const LiveTripDetails = lazy(() =>
  import("../../components/LiveTripDetails")
);
export const CashSelectedText = lazy(() =>
  import("../../components/CashSelectedText")
);
export const PaymentSuccessful = lazy(() =>
  import("../../components/PaymentSuccessful")
);
export const CountdownTillDriverArrives = lazy(() =>
  import("../../components/CountdownTillDriverArrives")
);
export const EmergencyButton = lazy(() =>
  import("../../components/EmergencyButton")
);
export const TripDetails = lazy(() => import("../../components/TripDetails"));
export const SelectNewDriver = lazy(() =>
  import("../../components/SelectNewDriver")
);
export const PaymentMethodHeader = lazy(() =>
  import("../../components/PaymentMethodHeader")
);
export const Confirm = lazy(() => import("../../screens/Confirm"));
export const Payment = lazy(() => import("../../screens/PaymentProcess"));
export const AddName = lazy(() => import("../../screens/AddName"));
export const Urgency = lazy(() => import("../../components/Urgency"));
export const StartRide = lazy(() =>
  import("../../components/RidePresentational")
);
export const PaymentHistoryPresentational = lazy(() =>
  import("../../components/PaymentHistoryPresentational")
);
export const AreYouSureYouArrivedModal = lazy(() =>
  import("../../components/AreYouSureYouArrivedModal")
);
export const StandByForCallModal = lazy(() =>
  import("../../components/StandByForCallModal")
);
export const HaveYouArrivedModal = lazy(() =>
  import("../../components/HaveYouArrivedModal")
);
export const DriverNotArrived = lazy(() =>
  import("../../components/DriverNotArrived.js")
);
export const RatingModal = lazy(() => import("../../components/RatingModal"));
export const DriversInfo = lazy(() => import("../../components/DriversInfo"));
export const CallDriver = lazy(() => import("../../components/CallDriver"));
export const ProfilePicture = lazy(() =>
  import("../../components/ProfilePicture")
);
export const PickUpLocation = lazy(() =>
  import("../../components/PickUpLocation")
);
export const PhoneAuthImage = lazy(() =>
  import("../../components/PhoneAuthImage")
);
export const navigationRef = React.createRef();
export const routeNameRef = React.createRef();
/* const httpLink = createHttpLink({
  uri: "https://agile-woodland-33090.herokuapp.com/",
}); */
const httpLink = createHttpLink({
  uri: "http://localhost:22000/graphql",
});
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
  getTripInfo,
  getlocation,
  StoreData,
  GetData,
  Location,
  StackActions,
  useMutation,
  useQuery,
  NEW_REQUEST,
  GET_DRIVERS,
  GET_DRIVER_RESPONSE,
  PAYMENT_CONFIRMATION,
  GET_CARD_PAYMENT_RESULT,
  CREATE_CHECKOUT,
  DRIVERS_LIVELOCATION,
  ALERT_EMAIL,
  GET_REQUEST_HISTORY,
  GET_USER_UUID,
  GET_PROFILE,
  USER_LOGIN,
  UPDATE_PROFILE,
  UPDATE_USERNAME,
  LoadingContent,
  TouchableOpacity,
  WebBrowser,
  Linking,
  useState,
  AsyncStorage,
  RFValue,
  RFPercentage,
  StyleSheet,
  wp,
  hp,
  Animated,
  CountdownCircleTimer,
  ActivityIndicator,
  Keyboard,
  Avatar,
  Image,
  FlatList,
  TextInput,
  Component,
  ScrollView,
  AirbnbRating,
  Button,
};
