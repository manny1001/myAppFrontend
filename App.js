import React, { lazy, Suspense } from "react";
import { Context, ContextConsumer } from "./src/context/Context";
import { View, Text, Dimensions } from "react-native";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Modal from "modal-enhanced-react-native-web";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import Loader from "./src/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetData } from "./src/utilites/GFunctions";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StoreData } from "./src/utilites/GFunctions";
const Profile = lazy(() => import("./src/screens/Profile"));
const Home = lazy(() => import("./src/navigation/Home"));
const Settings = lazy(() => import("./src/./navigation/More"));
const Payments = lazy(() => import("./src/./navigation/Payments"));
const AuthStack = lazy(() => import("./src/navigation/Auth"));
const httpLink = createHttpLink({
  uri: "http://192.168.43.182:4000/graphql",
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
const dispatchDimensions = () => {};
const App = ({ context }) => {
  const [windowWidth, setWindowWidth] = React.useState(null);
  const [windowHeight, setWindowHeight] = React.useState(null);
  React.useEffect(() => {
    GetData("windowWidth").then((data) => {
      setWindowWidth(data);
    });
    GetData("windowHeight").then((data) => {
      setWindowHeight(data);
    });
    dispatchDimensions();
  });

  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    const windowWidth = Dimensions.get("window").width;
    StoreData("windowWidth", windowWidth);
    const windowHeight = Dimensions.get("window").height;
    StoreData("windowHeight", windowHeight);
    context.dispatch({
      type: "WINDOW_WIDTH",
      windowWidth: JSON.parse(windowWidth),
    }),
      context.dispatch({
        type: "WINDOW_HEIGHT",
        windowHeight: JSON.parse(windowHeight),
      });
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      /*       console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected); */
    });
  }, []);

  const Stack = createStackNavigator();
  const AppStack = createBottomTabNavigator();
  if (isConnected === false)
    return (
      <Modal
        backdropOpacity={1}
        isVisible={!isConnected}
        onBackdropPress={() => {}}
      >
        {
          <View style={{}}>
            <Text style={{ color: "white" }}>
              No internet connection. Please enable your network connection.
            </Text>
          </View>
        }
      </Modal>
    );

  return (
    <NavigationContainer linking={linkingApp}>
      <ApolloProvider client={client}>
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
                      }}
                    />
                    <AppStack.Screen
                      name="Payments"
                      component={Payments}
                      options={{
                        tabBarLabel: "Payments",
                      }}
                    />
                    <AppStack.Screen
                      name="Profile"
                      component={Profile}
                      options={{
                        tabBarLabel: "Profile",
                      }}
                    />
                    <AppStack.Screen
                      name="Settings"
                      component={Settings}
                      options={{
                        tabBarLabel: "More",
                      }}
                    />
                  </AppStack.Navigator>
                )}
              </Suspense>
            );
          }}
        </ContextConsumer>
      </ApolloProvider>
    </NavigationContainer>
  );
};
const DrippyDriver = () => {
  return (
    <Context>
      <ContextConsumer>
        {(context) => {
          return <App context={context} />;
        }}
      </ContextConsumer>
    </Context>
  );
};
export default DrippyDriver;
