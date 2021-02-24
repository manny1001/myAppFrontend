import React, { Component, lazy } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const BigButton = lazy(() => import("../../src/components/Buttons"));
import styles from "../styles";
const AcceptTermsButton = lazy(() =>
  import("../../src/components/AcceptTermsButton")
);
const AcceptTermsImage = lazy(() => import("../components/AcceptTermsImage"));
class AcceptTandCs extends Component {
  constructor(props) {
    super(props);
    this.state = { CellNumber: "", isAccepted: false };
  }
  render() {
    return (
      <View style={[styles.container, {}]}>
        <AcceptTermsImage />
        <View
          style={{
            width: wp(60),
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignSelf: "center",
          }}
        >
          <AcceptTermsButton
            isAccepted={this.state.isAccepted}
            onPress={() => {
              this.setState({ isAccepted: !this.state.isAccepted });
            }}
          />
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text style={styles.heading5}>Accept Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <BigButton
          disabled={this.state.isAccepted === false ? true : false}
          activeOpacity={this.state.isAccepted === false ? 2 : 0.3}
          onPress={() => {
            this.props.navigation.navigate("PhoneAuth");
            this.props.context.dispatch({
              type: "AcceptedTCs",
            });
          }}
          title={"Continue"}
        />
      </View>
    );
  }
}

export default AcceptTandCs;
