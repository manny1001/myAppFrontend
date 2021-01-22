import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInput from "../Components/TextInput";
import { ContextConsumer } from "../Context";
import BigButton from "../Components/Buttons.js";
import { RFPercentage } from "react-native-responsive-fontsize";
const AddNames = (props) => {
  const [username, setusername] = React.useState(null);

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
          Already logged in before? Skip
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
          label={"Username"}
          text={username}
          onChangeText={(text) => {
            {
              text === "" && setusername(null);
            }

            {
              text !== "" && setusername(text);
            }
          }}
        />
      </View>
      <ContextConsumer>
        {(context) => {
          return (
            <BigButton
              onPress={() => {
                context.dispatch({
                  type: "SIGN_IN",
                  payload: {
                    username: username,
                    userToken: 1,
                  },
                });
              }}
              disabled={username === null ? true : false}
              title={"Save"}
            />
          );
        }}
      </ContextConsumer>
    </View>
  );
};

export default AddNames;
