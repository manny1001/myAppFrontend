import React, { lazy, Suspense } from "react";
import { Context, ContextConsumer } from "./src/context/Context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import Loader from "./src/components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Network from "expo-network";
const Profile = lazy(() => import("./src/screens/Profile"));
const Home = lazy(() => import("./src/navigation/Home"));
const Settings = lazy(() => import("./src/./navigation/More"));
const Payments = lazy(() => import("./src/./navigation/Payments"));
const AuthStack = lazy(() => import("./src/navigation/Auth"));
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

const App = () => {
  React.useEffect(() => {
    const Value = async () => {
      const v = await Network.getNetworkStateAsync();
      console.log(v.isConnected);
    };
    Value();
  });
  const Stack = createStackNavigator();
  const AppStack = createBottomTabNavigator();
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
        </Context>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
