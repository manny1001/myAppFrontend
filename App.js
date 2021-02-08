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
          initialRouteName: "Trip",
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
            Trip: { path: "Trip" },
            Cart: { path: "Cart" },
            Confirmationpage: { path: "Confirmationpage" },
            Checkout: { path: "Checkout" },
            Confirm: { path: "Confirm" },
            ProductItem: { path: "ProductItem" },
            Payment: { path: "Payment" },
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
        AddName: "AddName",
        EnterOTP: "EnterOTP",
        AcceptTandCs: "AcceptTandCs",
      },
    },
  },
};
const App = (props) => {
  const { context } = props;
  /*   const [Isplaying, setIsplaying] = useState(false); */
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(false);

  React.useEffect(() => {
    const RestoreAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("accessToken");
        const Active = await AsyncStorage.getItem("activeRequest");
        const isPlaying = await AsyncStorage.getItem("isPlaying");
        /*         setIsplaying(isPlaying); */
        context.dispatch({
          type: "SAVE_ISPLAYING",
          isPlaying: JSON.parse(isPlaying),
        });
        context.dispatch({
          type: "SAVE_ACTIVEREQUEST",
          activeRequest: JSON.parse(Active),
        });

        context.dispatch({
          type: "RESTORE_TOKEN",
          userToken: userToken,
        });
      } catch (e) {
        console.log(e);
      }
    };
    const StoreData = async (value) => {
      try {
        await AsyncStorage.setItem("accessToken", value);
      } catch (e) {
        // saving error
      }
    };
    /* StoreData(null); */
    RestoreAsync();
  }, []);

  return context.state.userToken === null ? (
    <AuthStack context={props.context} />
  ) : (
    <>
     
      <AppStack {...props} />
    </>
  );
};
const MainApp = () => {
  return (
    <NavigationContainer linking={linkingApp}>
      <Suspense fallback={Loader()}>
        <ApolloProvider client={client}>
          <Context>
            <ContextConsumer>
              {(context) => {
                return <App context={context} />;
              }}
            </ContextConsumer>
          </Context>
        </ApolloProvider>
      </Suspense>
    </NavigationContainer>
  );
};
export default MainApp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
});
