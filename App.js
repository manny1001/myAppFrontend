import React, { useState, lazy, Suspense } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "modal-enhanced-react-native-web";
const RatingScreen = lazy(() => import("./Screens/Rating"));
const TrackDriverModal = lazy(() => import("./Components/TrackDriverModal"));
const QuestionModal = lazy(() => import("./Components/QuestionModal"));
const AppStack = lazy(() => import("./navigation/AppStack"));
const AuthStack = lazy(() => import("./navigation/AuthStack"));

export default function App(props) {
  const [RatingModalVIsibile, setRatingModalVIsibile] = useState(false);
  const [trackMyDriverModal, settrackMyDriverModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [driverArrived, setDriverArrived] = useState(null);
  const [No, setNo] = useState(null);

  React.useEffect(() => {
    const RestoreAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem("accessToken");
        const Active = await AsyncStorage.getItem("activeRequest");
        props.context.dispatch({
          type: "SAVE_ACTIVEREQUEST",
          activeRequest: JSON.parse(Active),
        });
        console.log(Active);
        if (JSON.parse(Active) === true) {
          setQuestionModal(true);
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
  }, []);

  return props.context.state.userToken === null ? (
    <AuthStack context={props.context} />
  ) : (
    <>
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={questionModal === true}
        onBackdropPress={() => {}}
      >
        <QuestionModal
          context={props.context}
          setYes={() => {
            props.context.dispatch({
              type: "SAVE_DRIVERARRIVED",
              driverArrived: null,
            }),
              props.context.dispatch({
                type: "SAVE_ACTIVEREQUEST",
                activeRequest: false,
              }),
              () => setQuestionModal(false);
          }}
          No={No}
          setNo={() => {
            setNo(false),
              props.context.dispatch({
                type: "SAVE_ACTIVEREQUEST",
                activeRequest: false,
              });
          }}
          setQuestionModal={() => setQuestionModal(false)}
        />
      </Modal>
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={props.context.state.activeRequest === true}
        onBackdropPress={() => {}}
      >
        <TrackDriverModal
          onPress={() => {
            props.context.dispatch({
              type: "SAVE_ACTIVEREQUEST",
              activeRequest: false,
            }),
              () => setQuestionModal(true);
          }}
        />
      </Modal>
      <Modal isVisible={RatingModalVIsibile} onBackdropPress={() => {}}>
        <RatingScreen onPress={() => setvisibleModal(false)} />
      </Modal>
      <AppStack />
    </>
  );
}
