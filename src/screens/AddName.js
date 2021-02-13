import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TextInput from "../../src/components/TextInput";
import { GetData } from "../../src/utilites/GFunctions";
import BigButton from "../../src/components/Buttons.js";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useMutation } from "@apollo/client";
import { GET_PROFILE, UPDATE_USERNAME } from "../../src/utilites/Queries";
const AddNames = (props) => {
  const [useruuid, setuseruuid] = React.useState("");
  const [name, setusername] = React.useState(null);
  const [updateProfile] = useMutation(UPDATE_USERNAME, {
    refetchQueries: [{ query: GET_PROFILE }],
    onCompleted: () => console.log(updateProfile),
  });
  React.useEffect(() => {
    GetData("useruuid").then((value) => setuseruuid(value));
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
          flex: 1,
        }}
      >
        <Text style={{ alignSelf: "center" }}>Please add a Username.</Text>
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
          text={name}
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
      <BigButton
        onPress={() =>
          updateProfile({
            variables: {
              uuidUser: useruuid && useruuid,
              name: name && name,
            },
          })
        }
        disabled={name === null ? true : false}
        title={"Save"}
      />
    </>
  );
};

export default AddNames;