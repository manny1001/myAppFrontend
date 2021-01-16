import React, { PureComponent, useReducer } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLinkTo } from "@react-navigation/native";
import { ContextConsumer } from "../Context";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Constants from "expo-constants";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      errorMsg: null,
      latitude: null,
      longitude: null,
      currentAddress: null,
    };
  }

  render() {
    const { linkTo } = this.props;
    return (
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{ justifyContent: "space-around" }}
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            zIndex: 6,
            alignSelf: "center",
            fontSize: RFValue(25),
            fontWeight: "600",
            color: "white",
          }}
        >
          What are we doing today?
        </Text>

        {/* <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Restaurants");
                  }}
                  style={styles.button}
                >
                  <MaterialCommunityIcons
                    name="food"
                    size={wp(30)}
                    color="white"
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("getaride");
          }}
          style={styles.button}
        >
          {/* <Fontisto
                    name="taxi"
                    size={wp(15)}
                    color="white"
                    style={{ alignSelf: "center" }}
                  /> */}
          <Text
            style={{
              alignSelf: "center",
              fontSize: RFPercentage(5),
              color: "white",
              fontWeight: "bold",
            }}
          >
            Trip
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("RiderRoute");
                  }}
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    borderWidth: 3,
                    borderRadius: hp(10),
                    borderColor: "white",
                    padding: wp(3),
                    width: wp(50),
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: RFValue(16),
                      color: "white",
                      fontWeight: "400",
                    }}
                  >
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Parcels");
                  }}
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    borderWidth: 3,
                    borderRadius: hp(10),
                    borderColor: "white",
                    padding: wp(3),
                    width: wp(50),
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: RFValue(16),
                      color: "white",
                      fontWeight: "400",
                    }}
                  >
                    Send
                  </Text>
                </TouchableOpacity> */}

        {/*   <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    height: wp(15),
    width: wp(15),
    borderRadius: wp(7.5),
    padding: wp(3),
    borderWidth: hp(0.5),
    borderColor: "#CDCDCD",
  },
});

export default function (props) {
  const linkTo = useLinkTo();
  return (
    <ContextConsumer>
      {(context) => {
        return <LandingPage {...props} linkTo={linkTo} context={context} />;
      }}
    </ContextConsumer>
  );
}
