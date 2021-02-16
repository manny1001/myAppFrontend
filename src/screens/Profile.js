import React, { useState, lazy } from "react";
import { Text, ActivityIndicator, View, Keyboard } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const AddName = lazy(() => import("../../src/screens/AddName"));
import { Avatar, Image } from "react-native-elements";
import Loader from "../components/Loader";
import InputField from "../../src/components/TextInput";
import styles from "../styles/styles";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE, UPDATE_PROFILE } from "../../src/utilites/Queries";
const BigButton = lazy(() => import("../components/Buttons"));
/* const firebaseConfig = {
  apiKey: "AIzaSyAg87r_eLnJFPhQ9TTar2KGIKKWk6DKY9E",
  authDomain: "blobtest-36ff6.firebaseapp.com",
  databaseURL: "https://blobtest-36ff6.firebaseio.com",
  storageBucket: "blobtest-36ff6.appspot.com",
  messagingSenderId: "506017999540",
}; */

const ProfileStack = (props) => {
  const [uuid, setUUID] = useState(null);
  const [cellphone, setcellphone] = React.useState(
    data && data.currentUser.cellphone
  );
  const [email, setemail] = React.useState(data && data.currentUser.email);
  const [homeaddress, sethomeaddress] = React.useState(
    data && data.currentUser.homeaddress
  );
  const [workaddress, setworkaddress] = React.useState(
    data && data.currentUser.workaddress
  );
  const { loading, data, error } = useQuery(GET_PROFILE, {
    onCompleted: () => {
      setUUID(data && data.currentUser.uuid);
    },
  });
  const [updateProfile, { loading: LOADING }] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }],
    onCompleted: () => alert("Profile Succesfully Updated"),
  });

  const [name, setusername] = React.useState(data && data.currentUser.name);

  if (loading) return <Loader />;
  if (error) return <Text>{error.message}</Text>;
  if (
    (data && data.currentUser.name === null) ||
    (data && data.currentUser.name === "")
  ) {
    return <AddName />;
  }
  if (data && data.currentUser)
    return (
      <View style={styles.container}>
        <Image
          blurRadius={5}
          source={{ uri: data.currentUser.picture }}
          containerStyle={styles.profileImage}
        />
        <Avatar
          renderPlaceholderContent={
            data.currentUser.picture && <ActivityIndicator />
          }
          rounded
          size="xlarge"
          containerStyle={styles.profileAvatarContainer}
          avatarStyle={{}}
          source={
            data.currentUser.picture ? { uri: data.currentUser.picture } : ""
          }
        />

        <InputField
          style={styles.inputStyle}
          keyboardType={"default"}
          defaultValue={data.currentUser.name}
          label={"Username"}
          onChangeText={(text) => setusername(text)}
          selectionColor={"blue"}
        />
        <InputField
          style={styles.inputStyle}
          keyboardType={"phone-pad"}
          defaultValue={data.currentUser.cellphone}
          label={"Cellphone"}
          onChangeText={(text) => setcellphone(text)}
        />
        <InputField
          style={styles.inputStyle}
          keyboardType={"email-address"}
          defaultValue={data.currentUser.email}
          label={"Email"}
          onChangeText={(text) => setemail(text)}
        />
        <InputField
          style={styles.inputStyle}
          keyboardType={"default"}
          defaultValue={data.currentUser.homeaddress}
          label={"Home address"}
          onChangeText={(text) => sethomeaddress(text)}
        />
        <InputField
          style={styles.inputStyle}
          keyboardType={"default"}
          defaultValue={data.currentUser.workaddress}
          label={"Work address"}
          onChangeText={(text) => setworkaddress(text)}
        />

        <BigButton
          disabled={LOADING === true ? true : false}
          onPress={() => {
            Keyboard.dismiss(),
              updateProfile({
                variables: {
                  uuidUser: uuid && uuid,
                  name: name && name,
                  cellphone: cellphone && cellphone,
                  email: email && email,
                  homeaddress: homeaddress && homeaddress,
                  workaddress: workaddress && workaddress,
                },
              });
          }}
          title={"Update"}
          buttonStyle={{
            alignSelf: "center",
            flex: 1,
          }}
        />
      </View>
    );
};

export default ProfileStack;
