import React, { Component, lazy } from "react";
import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ContextConsumer } from "../Context";
const BigButton = lazy(() => import("../Components/Buttons"));
const AcceptTermsButton = lazy(() => import("../Components/AcceptTermsButton"));
const AcceptTermsImage = lazy(() => import("../Components/AcceptTermsImage"));
class AcceptTandCs extends Component {
  constructor(props) {
    super(props);
    this.state = { CellNumber: "", isAccepted: false };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <AcceptTermsImage />
          <View
            style={{
              width: wp(60),
              flexDirection: "row",
              justifyContent: "space-around",
              alignSelf: "center",
            }}
          >
            <AcceptTermsButton
              onPress={() => {
                this.setState({ isAccepted: !this.state.isAccepted });
              }}
            />
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
        <ContextConsumer>
          {(context) => {
            return (
              <BigButton
                disabled={this.state.isAccepted === false ? true : false}
                activeOpacity={this.state.isAccepted === false ? 2 : 0.3}
                onPress={() => {
                  this.props.navigation.navigate("PhoneAuth");
                  context.dispatch({
                    type: "AcceptedTCs",
                  });
                }}
                title={"Continue"}
              />
            );
          }}
        </ContextConsumer>
      </View>
    );
  }
}

export default AcceptTandCs;
