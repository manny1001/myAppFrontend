import React, { lazy } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import TextInput from "../Components/TextInput";
import { ContextConsumer } from "../Context";
const BigButton = lazy(() => import("../Components/Buttons"));
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const AddEmail = (props) => {
  const [UserEmail, setUserEmail] = React.useState(null);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        style={{ flex: 0.12, justifyContent: "center" }}
        onPress={() => props.navigation.navigate("PhoneAuth")}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: RFPercentage(2.5),
            color: "blue",
          }}
        >
          Skip , Add email later
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          flex: 1,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#f3f3f3",
            alignSelf: "center",
            width: wp(80),
            height: hp(7),
            fontSize: RFPercentage(2),
          }}
          keyboardType={"default"}
          label={"Email address"}
          text={UserEmail}
          onChangeText={(text) => {
            {
              text === "" && setUserEmail(null);
            }

            {
              text !== "" && setUserEmail(text);
            }
          }}
        />
      </View>
      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              onPress={() => {
                context.dispatch({ type: "SAVE_EMAIL", payload: UserEmail });
                props.navigation.navigate("PhoneAuth");
                AsyncStorage.setItem("isFirstTime", "true");
              }}
              disabled={UserEmail === null ? true : null}
              title={"Save"}
            />
          );
        }}
      </ContextConsumer>
    </View>
  );
};

export default AddEmail;
