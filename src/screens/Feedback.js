import React, { Component, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import styles from "../styles/styles";
const Feedback = (props) => {
  const [feedback, setfeedBack] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        containerStyle={{ flex: 1 }}
        style={{
          flex: 1,

          alignSelf: "stretch",
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
          flex: 0.25,
          alignSelf: "center",
          justifyContent: "space-around",
          flexDirection: "column",
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

export default Feedback;
