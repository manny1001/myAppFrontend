import "@expo/match-media";
import React, { lazy, Suspense } from "react";
import { Context, ContextConsumer } from "./src/context/Context";
import { useMediaQuery } from "react-responsive";
import { View, Text, Dimensions } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import Modal from "modal-enhanced-react-native-web";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import Loader from "./src/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetData } from "./src/utilites/GFunctions";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "./src/styles/styles";
const Profile = lazy(() => import("./src/screens/Profile"));
const Home = lazy(() => import("./src/navigation/Home"));
const Settings = lazy(() => import("./src/./navigation/More"));
const AuthStack = lazy(() => import("./src/navigation/Auth"));
const TabIcon = lazy(() => import("./src/components/TabIcon.js"));
const Payments = lazy(() => import("./src/screens/PaymentHistory.js"));

/* const httpLink = createHttpLink({
  uri: "https://agile-woodland-33090.herokuapp.com/",
}); */
const httpLink = createHttpLink({
  uri: "http://localhost:22000/graphql",
});
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
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
          initialRouteName: "Ride",
          screens: {
            Ride: { path: "Ride" },
            Cart: { path: "Cart" },
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
            Feedback: "Feedback",
            About: "About",
          },
        },
        PaymentsStack: { path: "payments", screens: { Orders: "Orders" } },
      },
    },
    Auth: {
      path: "Auth",
      Screens: {
        AcceptTandCs: "AcceptTandCs",
        PhoneAuth: "PhoneAuth",
      },
    },
  },
};

const App = (props) => {
  const useScreenDimensions = () => {
    const [screenData, setScreenData] = React.useState(
      Dimensions.get("screen")
    );

    return { screenData, setScreenData };
  };
  const { screenData, setScreenData } = useScreenDimensions();
  const [windowWidth, setwindowWidth] = React.useState(null);
  const [windowHeight, setwindowHeight] = React.useState(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [loaded] = useFonts({
    Gotham_Medium_Regular: require("./assets/fonts/Gotham_Medium_Regular.ttf"),
  });
  React.useEffect(() => {
    /* const addListener = async () => {
      try {
        let url = await Linking.getInitialURL();
        this._handleRedirect({ url });
      } catch (error) {
        console.log("error: ", error);
      }
    }; */
  }, []);

  React.useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.screen);
    };

    Dimensions.addEventListener("change", onChange);

    setwindowWidth(screenData.width);
    setwindowHeight(screenData.height);
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      /*       console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected); */
    });
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, [screenData]);
  const Stack = createStackNavigator();
  const AppStack = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  if (isConnected === false)
    return (
      <Modal
        backdropOpacity={1}
        isVisible={!isConnected}
        onBackdropPress={() => {}}
      >
        {
          <View style={{}}>
            <Text
              style={{ fontFamily: "Gotham_Medium_Regular", color: "white" }}
            >
              No internet connection. Please enable your network connection.
            </Text>
          </View>
        }
      </Modal>
    );

  if (!loaded) {
    return null;
  }

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
                  ) : windowWidth > 1024 ? (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Auth"
                        component={() => {
                          return (
                            <View style={{ justifyContent: "center", flex: 1 }}>
                              <Text
                                style={{
                                  alignSelf: "center",
                                  fontSize: 50,
                                  fontFamily: "Gotham_Medium_Regular",
                                }}
                              >
                                Under construction, please use a smaller screen
                                device.
                              </Text>
                            </View>
                          );
                        }}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  ) : (
                    <AppStack.Navigator
                      tabBarOptions={{
                        keyboardHidesTabBar: true,
                        style: styles.tabBarStyle,
                        activeBackgroundColor: "#C4C0FF",
                        tabStyle: styles.tabStyle,
                        labelStyle: styles.tabBarLabelStyles,
                        showLabel: false,
                      }}
                      backBehavior="history"

                      /* sceneContainerStyle={{ borderWidth: 0.1 }} */
                    >
                      <AppStack.Screen
                        name="Home"
                        component={Home}
                        options={{
                          tabBarIcon: () => <TabIcon name={"home"} />,
                        }}
                      />
                      <AppStack.Screen
                        name="Payments"
                        component={Payments}
                        options={{
                          tabBarIcon: () => <TabIcon name={"payment"} />,
                        }}
                      />
                      <AppStack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                          tabBarIcon: () => <TabIcon name={"person"} />,
                        }}
                      />
                      <AppStack.Screen
                        name="More"
                        component={Settings}
                        options={{
                          tabBarIcon: () => <TabIcon name={"more"} />,
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
