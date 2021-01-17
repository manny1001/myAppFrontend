import React, { useState, lazy, Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "modal-enhanced-react-native-web";
import { ContextConsumer } from "./Context";
import Loader from "./navigation/Loader";
import * as Linking from "expo-linking";
const RatingScreen = lazy(() => import("./Screens/Rating"));
const AppStack = lazy(() => import("./navigation/AppStack"));
const AuthStack = lazy(() => import("./navigation/AuthStack"));
const prefix = Linking.makeUrl("/");
const linkingApp = {
  prefixes: [prefix],
  config: {
    AppStack: {
      path: "AppStack",
      screens: {
        HomeStack: {
          path: "home",
          initialRouteName: "AddName",
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
        AddEmail: "AddEmail",
        AddName: "AddName",
        EnterOTP: "EnterOTP",
        AcceptTandCs: "AcceptTandCs",
      },
    },
  },
};

export default function App(props) {
  const [visibleModal, setvisibleModal] = useState(false);
  React.useEffect(() => {
    const RestoreAsync = async () => {
      AsyncStorage.multiGet([
        "clientCellNumber",
        "clientFirstName",
        "clientLastName",
        "clientEmail",
        "destination",
        "departureTime",
        "destinationArrivalTime",
        "driverName",
        "driverCellPhone",
        "driverRegistration",
        "driverImage",
        "driverRegistration",
        "departure",
        "timeRequested",
        "paymentMethod",
        "tripFee",
        "tip",
        "total",
      ]).then((response) => {
        response.map((C, i) => {
          if (!C[1]) {
            AsyncStorage.setItem(C[0], props.context.state[C[0]]);
          }
          if (props.context.state[C[0]] && props.context.state[C[0]] !== C[1]) {
            AsyncStorage.setItem(C[0], props.context.state[C[0]]);
          }
          /* console.log(
            "new value is",
            props.context.state[C[0]],
            "old value is",
            C[1]
          ); */
        });
      });
      try {
        const userToken = await AsyncStorage.getItem("loggedInTrue");

        props.context.dispatch({
          type: "RESTORE_TOKEN",
          userToken: userToken,
        });
      } catch (e) {
        console.log(e);
      }
    };

    RestoreAsync();
  }, [
    props.context.state.clientCellNumber,
    props.context.state.clientFirstName,
    props.context.state.clientLastName,
    props.context.state.clientEmail,
    props.context.state.destination,
    props.context.state.departureTime,
    props.context.state.destinationArrivalTime,
    props.context.state.driverName,
    props.context.state.driverCellPhone,
    props.context.state.departure,
    props.context.state.paymentMethod,
    props.context.state.tripFee,
    props.context.state.tip,
    props.context.state.total,
  ]);

  return (
    <NavigationContainer linking={linkingApp}>
      <Suspense fallback={Loader()}>
        <ContextConsumer>
          {(context) => {
            return context.state.userToken === null ? (
              <AuthStack context={context} />
            ) : (
              <>
                <Modal
                  isVisible={visibleModal}
                  onBackdropPress={() => setvisibleModal(false)}
                >
                  <RatingScreen onPress={() => setvisibleModal(false)} />
                </Modal>
                <AppStack />
              </>
            );
          }}
        </ContextConsumer>
      </Suspense>
    </NavigationContainer>
  );
}
