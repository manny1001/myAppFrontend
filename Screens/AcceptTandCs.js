import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import BigButton from "../Components/Buttons.js";
import { ContextConsumer } from "../Context";
class AcceptTandCs extends Component {
  constructor(props) {
    super(props);
    this.state = { CellNumber: "", isAccepted: false };
  }
  render() {
    return (
      <View
        style={{
          height: hp(100),
          weight: wp(100),
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        <StatusBar style="light" translucent={false} />
        <View
          style={{
            flexDirection: "column",
            height: hp(80),
            weight: wp(100),
            justifyContent: "space-around",
          }}
        >
          <Image
            source={require("../assets/accept.png")}
            style={{
              height: wp(90),
              width: wp(90),
              top: 0,
              alignSelf: "center",
            }}
          />

          <View
            style={{
              width: wp(60),

              flexDirection: "row",
              justifyContent: "space-around",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.setState({ isAccepted: !this.state.isAccepted })
              }
            >
              <MaterialCommunityIcons
                name={
                  this.state.isAccepted === false
                    ? "checkbox-blank-outline"
                    : "checkbox-marked-outline"
                }
                size={wp(10)}
                color="black"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: "center" }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: RFValue(14),
                  color: "#6c63ff",
                }}
              >
                Accept Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <BigButton
          disabled={this.state.isAccepted === false ? true : false}
          activeOpacity={this.state.isAccepted === false ? 2 : 0.3}
          onPress={() => {
            this.props.props.navigation.navigate("AddName");
            /*   this.props.props.context.dispatch({ type: "SET_FIRST_TIME" }); */
          }}
          title={"Continue"}
          buttonStyle={{
            height: hp(10),
            width: wp(80),
            alignSelf: "center",
            backgroundColor:
              this.state.isAccepted === false ? "grey" : "#6c63ff",
          }}
        />
      </View>
    );
  }
}

export default function App(props) {
  return (
    <ContextConsumer>
      {(context) => {
        return <AcceptTandCs context={context} props={props} />;
      }}
    </ContextConsumer>
  );
}
