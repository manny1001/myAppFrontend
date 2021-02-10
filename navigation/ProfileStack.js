import React, { useState, lazy, Suspense } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { RFValue } from "react-native-responsive-fontsize";
import { Avatar, Image } from "react-native-elements";
import Loader from "../Components/Loader";
import InputField from "../Components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextConsumer } from "../Context";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROFILE } from "../Queries";
/* const firebaseConfig = {
  apiKey: "AIzaSyAg87r_eLnJFPhQ9TTar2KGIKKWk6DKY9E",
  authDomain: "blobtest-36ff6.firebaseapp.com",
  databaseURL: "https://blobtest-36ff6.firebaseio.com",
  storageBucket: "blobtest-36ff6.appspot.com",
  messagingSenderId: "506017999540",
}; */
const AddName = lazy(() => import("../Screens/AddName"));
const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $uuidUser: String!
    $name: String
    $email: String
    $cellphone: String
    $homeaddress: String
    $workaddress: String
  ) {
    updateProfile(
      uuidUser: $uuidUser
      name: $name
      email: $email
      cellphone: $cellphone
      homeaddress: $homeaddress
      workaddress: $workaddress
    )
  }
`;

const BigButton = lazy(() => import("../Components/Buttons"));
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileStack = (props) => {
  const [uuid, setUUID] = useState(null);
  const { loading, data, error } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setUUID(data && data.currentUser.uuid);
    },
  });
  console.log(data);
  const [updateProfile, { data: DATA }] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }],
    onCompleted: () => alert("Profile Succesfully Updated"),
  });
  const [name, setusername] = React.useState(data && data.currentUser.name);
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
  const AysncLogout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      return true;
    } catch (e) {
      return false;
    }
  };
  if (error) {
    console.log(error);
  }
  if (loading) return <Loader />;
  if (
    (data && data.currentUser.name === null) ||
    (data && data.currentUser.name === "")
  ) {
    return <AddName />;
  }
  if (data && data.currentUser)
    return (
      <View
        style={{ flexDirection: "column", flex: 1, justifyContent: "center" }}
      >
        <StatusBar translucent={false} style="light" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: wp(100), height: hp(100) }}
        >
          <View
            style={{
              width: wp(100),
              height: hp(15),
            }}
          >
            <Image
              blurRadius={5}
              source={
                data && data.currentUser
                  ? { uri: data.currentUser.picture }
                  : ""
              }
              style={{ width: wp(100), height: hp(15) }}
            />
            <Avatar
              renderPlaceholderContent={
                data.currentUser.picture && <ActivityIndicator />
              }
              rounded
              size="xlarge"
              containerStyle={{
                height: hp(20),
                width: hp(20),
                borderRadius: hp(10),
                position: "absolute",
                top: hp(2),
                marginLeft: wp(10),
                bottom: 0,
              }}
              avatarStyle={{}}
              source={
                data.currentUser.picture
                  ? { uri: data.currentUser.picture }
                  : ""
              }
            />
            <TouchableOpacity
              style={{ position: "absolute", right: wp(3), bottom: hp(1) }}
            ></TouchableOpacity>
          </View>

          <View
            style={{
              width: windowWidth,
              height: windowHeight - hp(50),
              marginTop: hp(8),
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
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
          </View>
          <View
            style={{
              alignSelf: "stretch",
              alignItems: "stretch",
              height: hp(12),
              justifyContent: "center",
            }}
          >
            <BigButton
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
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    width: wp(80),
    height: hp(6),
    fontSize: RFValue(13),
  },
});

export default ProfileStack;
