import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  Link,
} from "react-native";
import { useLinkTo } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import Header from "../Components/Header";
import { StackActions } from "@react-navigation/native";
class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { linkTo } = this.props;
    return (
      <>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Text style={{ fontSize: 27, alignSelf: "center" }}>
            Payment Processed
          </Text>
          <TouchableOpacity
            onPress={() => {
              linkTo("/payments/Orders"),
                this.props.navigation.dispatch(StackActions.replace("Landing"));
            }}
          >
            <Text
              style={{ alignSelf: "center", fontSize: 22 }}
              href={"https://Google.com"}
              accessibilityRole="link"
              target="_blank"
            >
              Follow this link to track your driver
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
export default function (props) {
  const linkTo = useLinkTo();

  return <ConfirmationPage {...props} linkTo={linkTo} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
