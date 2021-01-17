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
      <TextInput
        style={{
          flex: 1,
          width: wp(100),
          alignSelf: "center",
          borderColor: "gray",
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
          width: wp(100),
          flex: 0.25,
          alignSelf: "center",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ flexDirection: "column", alignSelf: "center" }}
        >
          <Text style={{ alignSelf: "center" }}>Cancel</Text>
        </TouchableOpacity>
        {feedback !== "" && (
          <TouchableOpacity
            style={{ flexDirection: "column", alignSelf: "center" }}
          >
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
