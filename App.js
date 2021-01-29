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
import { GetData } from "./GFunctions";
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
  const [trackMyDriverModal, settrackMyDriverModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(true);
  const [driverArrived, setDriverArrived] = useState(null);
  const [No, setNo] = useState(null);

  React.useEffect(() => {
    console.log(props.context.state.activeRequest);
    const RestoreAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("accessToken");
        const Active = await AsyncStorage.getItem("activeRequest");
        console.log(Active);
        props.context.dispatch({
          type: "SAVE_ACTIVEREQUEST",
          activeRequest: JSON.parse(Active),
        });
        if (JSON.parse(Active) === false) {
          setQuestionModal(false);
        }
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
  }, [props.context.state.activeRequest]);

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
                  isVisible={
                    context.state.driverArrived === true && questionModal
                  }
                  onBackdropPress={() => {}}
                >
                  <QuestionModal
                    context={context}
                    setYes={() => {
                      context.dispatch({
                        type: "SAVE_DRIVERARRIVED",
                        driverArrived: null,
                      }),
                        context.dispatch({
                          type: "SAVE_ACTIVEREQUEST",
                          activeRequest: false,
                        }),
                        setQuestionModal(false);
                    }}
                    No={No}
                    setNo={() => setNo(false)}
                    setQuestionModal={() => setQuestionModal(false)}
                  />
                </Modal>
                <Modal
                  backgroundColor={"#f2f2f2"}
                  isVisible={
                    context.state.activeRequest === true &&
                    context.state.driverArrived === false
                  }
                  onBackdropPress={() => {}}
                >
                  <TrackDriverModal
                    onPress={() => {
                      context.dispatch({
                        type: "SAVE_DRIVERARRIVED",
                        driverArrived: true,
                      });
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
