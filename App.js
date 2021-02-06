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
import Application from "./App";
import * as Linking from "expo-linking";
import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
const RatingScreen = lazy(() => import("./Screens/Rating"));
const TrackDriverModal = lazy(() => import("./Components/TrackDriverModal"));
const QuestionModal = lazy(() => import("./Components/QuestionModal"));
const AppStack = lazy(() => import("./navigation/AppStack"));
const AuthStack = lazy(() => import("./navigation/AuthStack"));
const BigButton = lazy(() => import("./Components/Buttons"));
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
  console.log(props);
  const [Isplaying, setIsplaying] = useState(false);
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [driverArrived, setDriverArrived] = useState(false);
  const [No, setNoValue] = useState(false);

  React.useEffect(() => {
    const RestoreAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("accessToken");
        const Active = await AsyncStorage.getItem("activeRequest");
        const isPlaying = await AsyncStorage.getItem("isPlaying");
        setIsplaying(isPlaying);
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
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={driverArrived}
        onBackdropPress={() => {}}
      >
        <View style={styles.container}>
          <Text
            style={{
              fontSize: RFPercentage(5),
              alignSelf: "center",
              width: wp(75),
            }}
          >
            One of our call center agents will get back to you within the next
            15 mins
          </Text>
          <BigButton
            title={"Okay"}
            onPress={() => {
              setDriverArrived(false);
            }}
            titleStyle={{
              fontWeight: "bold",
              fontSize: RFPercentage(3),
            }}
            containerStyle={{
              top: hp(20),
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
          />
        </View>
      </Modal>

      <Modal backgroundColor={"#f2f2f2"} isVisible={questionModal}>
        <QuestionModal
          setYes={() => {
            setQuestionModal(false),
              context.dispatch({
                type: "SAVE_ISPLAYING",
                isPlaying: false,
              });
            /* setTrackMtTrip(true) */
          }}
          setNo={() => {
            setQuestionModal(false),
              context.dispatch({
                type: "SAVE_ACTIVEREQUEST",
                activeRequest: true,
              }),
              context.dispatch({
                type: "SAVE_ISPLAYING",
                isPlaying: false,
              }),
              setNoValue(true);
          }}
        />
      </Modal>
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={props.context.state.activeRequest === true}
        onBackdropPress={() => {
          context.dispatch({
            type: "SAVE_ACTIVEREQUEST",
            activeRequest: false,
          });
        }}
      >
        <TrackDriverModal
          Isplaying={Isplaying}
          No={No}
          onPress={() => {
            context.dispatch({
              type: "SAVE_ACTIVEREQUEST",
              activeRequest: false,
            }),
              context.dispatch({
                type: "SAVE_ISPLAYING",
                isPlaying: false,
              }),
              setQuestionModal(true);
          }}
        />
      </Modal>
      <Modal isVisible={RatingModalVIsibile} onBackdropPress={() => {}}>
        <RatingScreen onPress={() => setRatingModalVIsibile(false)} />
      </Modal>
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
