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
  const [UserFirstName, setUserFirstName] = React.useState(null);
  const [UserLastName, setUserLastName] = React.useState(null);

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
          label={"First Name"}
          text={UserFirstName}
          onChangeText={(text) => {
            {
              text === "" && setUserFirstName(null);
            }

            {
              text !== "" && setUserFirstName(text);
            }
          }}
        />
        <TextInput
          style={{
            backgroundColor: "#f3f3f3",
            alignSelf: "center",
            width: wp(80),
            height: hp(7),
            fontSize: RFPercentage(2),
          }}
          keyboardType={"default"}
          label={"Last Name"}
          text={UserLastName}
          onChangeText={(text) => {
            {
              text === "" && setUserLastName(null);
            }

            {
              text !== "" && setUserLastName(text);
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
                  type: "SAVE_NAMES",
                  payload: {
                    FirstName: UserFirstName,
                    LastName: UserLastName,
                  },
                });
                props.navigation.navigate("AddEmail");
              }}
              disabled={
                UserFirstName === null
                  ? true
                  : UserLastName === null
                  ? true
                  : null
              }
              title={"Save"}
            />
          );
        }}
      </ContextConsumer>
    </View>
  );
};

export default AddNames;
