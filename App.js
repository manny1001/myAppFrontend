import React, { useState, lazy, Suspense } from "react";
import { View, Text, StyleSheet } from "react-native";
const BigButton = lazy(() => import("./Components/Buttons"));
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
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
  const [driverArrived, setDriverArrived] = useState(false);

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
            setQuestionModal(false);
          }}
          setNo={() => {
            setQuestionModal(false), setDriverArrived(true);
          }}
        />
      </Modal>
      <Modal
        backgroundColor={"#f2f2f2"}
        isVisible={props.context.state.activeRequest === true}
        onBackdropPress={() => {
          props.context.dispatch({
            type: "SAVE_ACTIVEREQUEST",
            activeRequest: false,
          });
        }}
      >
        <TrackDriverModal
          No={No}
          onPress={() => {
            props.context.dispatch({
              type: "SAVE_ACTIVEREQUEST",
              activeRequest: false,
            }),
              setQuestionModal(true),
              console.log("waddduo");
          }}
        />
      </Modal>
      <Modal isVisible={RatingModalVIsibile} onBackdropPress={() => {}}>
        <RatingScreen onPress={() => setRatingModalVIsibile(false)} />
      </Modal>
      <AppStack {...props} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
});
