import React, { useState, lazy, Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "modal-enhanced-react-native-web";
import { ContextConsumer } from "./Context";
import Loader from "./Components/Loader";
import * as Linking from "expo-linking";
const RatingScreen = lazy(() => import("./Screens/Rating"));
const TrackDriverModal = lazy(() => import("./Components/TrackDriverModal"));
const QuestionModal = lazy(() => import("./Components/QuestionModal"));
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

export default function App(props) {
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(false);
  const [trackMyDriverModal, settrackMyDriverModal] = useState(true);
  const [questionModal, setQuestionModal] = useState(false);
  const [driverArrived, setDriverArrived] = useState(null);
  const [hasDriverArrived, sethasDriverArrivedModal] = useState(true);
  React.useEffect(() => {
    const RestoreAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("accessToken");
        props.context.dispatch({
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
                  backgroundColor={"#f2f2f2"}
                  isVisible={trackMyDriverModal === false}
                  onBackdropPress={() => {}}
                >
                  <QuestionModal
                    driverArrived={driverArrived}
                    setNo={() => setDriverArrived(false)}
                    setOkay={() => {}}
                    setYes={() => {}}
                  />
                </Modal>
                <Modal
                  backgroundColor={"#f2f2f2"}
                  isVisible={trackMyDriverModal}
                  onBackdropPress={() => {}}
                >
                  <TrackDriverModal
                    onPress={() => {
                      settrackMyDriverModal(false),
                        sethasDriverArrivedModal(true);
                    }}
                  />
                </Modal>
                <Modal
                  isVisible={RatingModalVIsibile}
                  onBackdropPress={() => {}}
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
