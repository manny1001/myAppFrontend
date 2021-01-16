import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import Header from "../Components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const Feedback = (props) => {
  const [feedback, setfeedBack] = useState("");

  return (
    <View style={styles.container}>
      <Header
        backColor={"transparent"}
        LeftComponent={
          {
            /* <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <AntDesign name="arrowleft" size={wp(7)} color="black" />
          </TouchableOpacity> */
          }
        }
        CenterComponent={
          <Text style={{ fontSize: RFValue(20) }}>Send feedback</Text>
        }
      />
      <TextInput
        style={{
          height: hp(60),
          width: wp(95),
          alignSelf: "center",
          borderColor: "gray",
          /*   borderWidth: 0.25, */
          placeholderTextColor: "gray",
        }}
        value={feedback}
        onChangeText={(value) => setfeedBack(value)}
        multiline={true}
        numberOfLines={10}
        underlineColorAndroid="transparent"
        placeholder={
          "Have feedback,questions or have found a bug? We'd love to hear it..."
        }
      />

      <View
        style={{
          width: wp(70),
          height: hp(15),
          alignSelf: "center",
          top: hp(4),
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ flexDirection: "column" }}
        >
          {/* <MaterialIcons
            name="cancel"
            size={wp(10)}
            color="black"
            style={{ alignSelf: "center" }}
          /> */}
          <Text style={{ alignSelf: "center" }}>Cancel</Text>
        </TouchableOpacity>
        {feedback !== "" && (
          <TouchableOpacity style={{ flexDirection: "column" }}>
            <FontAwesome
              name="send"
              size={wp(10)}
              color="black"
              style={{ alignSelf: "center" }}
            />
            <Text style={{ alignSelf: "center" }}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Feedback;
