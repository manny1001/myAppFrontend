import React, { lazy, Suspense, useState, Component, useCallback } from "react";
import { Context, ContextConsumer } from "../../context/Context";
import { useMutation, useQuery } from "@apollo/client";
import { AirbnbRating, Button, Avatar, Image } from "react-native-elements";
import { useFonts } from "expo-font";
import * as WebBrowser from "expo-web-browser";
import Modal from "modal-enhanced-react-native-web";
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
import * as Notifications from "expo-notifications";
import { createStackNavigator } from "@react-navigation/stack";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import { setContext } from "@apollo/client/link/context";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
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
  GET_MESSAGES,
  POST_MESSAGE,
  GET_NEW_DRIVER,
  NEW_PERSONAL_DRIVER,
  CURRENT_DRIVER,
  CHECK_FOR_ACTIVE_REQUEST,
} from "../../utilites/Queries";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import {
  View,
  Text as TEXT,
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
import { TextInput as TEXTINPUT } from "react-native-paper";
import styles from "../../styles";
import { StoreData, GetData } from "../../utilites/GFunctions";
import { getTripInfo, getlocation } from "../../utilites/utilities";
import { LoadingContent } from "../../components/Loader";
import Loader from "../../components/Loader";
import Constants from "expo-constants";
import { StackActions } from "@react-navigation/native";
export const InputField = lazy(() => import("../../components/TextInput"));
export const Profile = lazy(() => import("../../screens/Profile"));
export const Home = lazy(() => import("../../navigation/Home"));
export const More = lazy(() => import("../../navigation/More"));
export const Text = ({ style, children, color }) => {
  return (
    <TEXT
      style={[
        style,
        {
          fontFamily: "Gotham_Medium_Regular",
          color: color ? color : "#E8ECFD",
        },
      ]}
    >
      {children}
    </TEXT>
  );
};

export const ClickedDriver = lazy(() =>
  import("../../components/ClickedDriver")
);
export const AllDrivers = lazy(() => import("../../components/AllDrivers"));
export const OrderReceipt = lazy(() => import("../../screens/OrderReceipt.js"));
export const SendTipModal = lazy(() => import("../../components/SendTipModal"));
export const Order = lazy(() => import("../../components/Order"));
export const RatingScreen = lazy(() => import("../../screens/Rating.js"));
export const AuthStack = lazy(() => import("../../navigation/Auth"));
export const TabIcon = lazy(() => import("../../components/TabIcon.js"));
export const Payments = lazy(() => import("../../screens/PaymentHistory.js"));
export const HeadingText = lazy(() => import("../../components/HeadingText"));
export const MethodPicker = lazy(() => import("../../components/MethodPicker"));
export const Settings = lazy(() => import("../../screens/Settings"));
export const windowWidth = Dimensions.get("window").width;
export const Header = lazy(() => import("../../components/Header"));
export const MyPersonalDriver = lazy(() =>
  import("../../components/MyPersonalDriver")
);
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
export const Chat = lazy(() => import("../../components/ChatApp"));
export const GoogleAutoComplete = lazy(() =>
  import("../../components/GoogleAutoComplete")
);
export const Indicator = () => {
  return (
    <ActivityIndicator
      color="#6c63ff"
      size="large"
      style={{ position: "absolute", top: "50%", left: "50%" }}
    />
  );
};
export const Driver = lazy(() => import("../../components/SelectDriver"));
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
  import("../../components/CountDownTillDriverArrives")
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
export const AreYouSureDriverArrivedModal = lazy(() =>
  import("../../components/AreYouSureDriverArrivedModal")
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
  uri: "http://192.168.8.130:22000/graphql",
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
import {
  Avatar as AVATAR,
  GiftedChat,
  Send,
  MessageText,
  Bubble,
  SystemMessage,
  Message,
} from "react-native-gifted-chat";
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
  GET_MESSAGES,
  POST_MESSAGE,
  GET_NEW_DRIVER,
  NEW_PERSONAL_DRIVER,
  CURRENT_DRIVER,
  CHECK_FOR_ACTIVE_REQUEST,
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
  useCallback,
  AVATAR,
  GiftedChat,
  Send,
  MessageText,
  Bubble,
  SystemMessage,
  Message,
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  GooglePlacesAutocomplete,
  Picker,
  Icon,
  MaterialIcons,
  TEXTINPUT,
  Constants,
  Notifications,
};
