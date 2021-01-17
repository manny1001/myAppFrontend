import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "modal-enhanced-react-native-web";
import { RFValue } from "react-native-responsive-fontsize";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BigButton from "../Components/Buttons.js";
import { ContextConsumer } from "../Context";
import Driver from "../Components/ScrollToIndexFlatlist";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
class ConfirmRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      location: [],
      errorMsg: null,
      latitude: null,
      longitude: null,
      currentLocation: "",
      isLoading: false,
      isClicked: false,
      distance: "",
      time: "",
      isVisible: true,
      tipModalVisible: false,
      paymentMethodSelected: false,
      tipAdded: false,
      tipAmount: 0.0,
      orderAmount: 200.6,
      totalAmount: 0,
      result: 0,
      selectedValue: "Select",
      paymentMethod: null,
      DestinationSelected: false,
      savedLocationVisible: false,
      checked: "first",
      value: null,
      tripAmount: 25.0,
    };

    Geocoder.init("AIzaSyD7WWrmocEDp4T9JonO47DB1GSPllLJbsk");
  }
  componentDidMount() {
    AsyncStorage.multiGet([
      "departure",
      "destination",
      "clientCellNumber",
      "clientEmail",
    ]).then((response) => {
      this.setState({ departure: response[0][1] });
      this.setState({ destination: response[1][1] });
    });
  }
  render() {
    const Dots = () => {
      return (
        <>
          {/* <Entypo
            name="circle"
            size={wp(5)}
            color="black"
            style={{
              alignSelf: "center",
              backgroundColor: this.state.isPressed == 1 && "#6c63ff",
              height: wp(5),
              width: wp(5),
              borderRadius: wp(2.5),
            }}
          />
          <Entypo
            name="circle"
            size={wp(5)}
            color="black"
            style={{
              alignSelf: "center",
              backgroundColor: this.state.isPressed == 2 && "#6c63ff",
              height: wp(5),
              width: wp(5),
              borderRadius: wp(2.5),
            }}
          />
          <Entypo
            name="circle"
            size={wp(5)}
            color="black"
            style={{
              alignSelf: "center",
              backgroundColor: this.state.isPressed == 3 && "#6c63ff",
              height: wp(5),
              width: wp(5),
              borderRadius: wp(2.5),
            }}
          /> */}
        </>
      );
    };
    return (
      <ContextConsumer>
        {(context) => {
          return (
            <>
              <View
                style={{
                  flex: 1,
                  width: wp(100),
                  alignSelf: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.heading2}>Departure</Text>
                <View style={styles.locationsBlock}>
                  <Text style={styles.locations}>{this.state.departure}</Text>
                  {/* <View style={styles.block}>
                        <Text style={styles.locations}>
                          {context.state.departureTime}time
                        </Text>
                      </View> */}
                </View>

                <Text style={styles.heading2}>Destination</Text>
                <View style={styles.locationsBlock}>
                  <Text style={styles.locations}>{this.state.destination}</Text>
                  {/* <View style={styles.block}>
                        <Text style={styles.locations}>
                          {context.state.destinationArrivalTime}time
                        </Text>
                      </View> */}
                </View>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  alignSelf: "center",
                  flex: 1,
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontWeight: "bold",
                  }}
                >
                  Driver
                </Text>
                <Driver />
                {/* <View
                  style={{
                    width: wp(30),
                    height: hp(10),
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Dots />
                </View> */}
              </View>
              <View
                style={{
                  flex: 0.25,
                  width: wp(100),
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <BigButton
                  buttonStyle={{
                    width: wp(80),
                    alignSelf: "center",
                  }}
                  titleStyle={{ fontWeight: "bold" }}
                  title={
                    "Proceed" + " " + "\n" + "R" + " " + this.state.tripAmount
                  }
                  onPress={() => {
                    this.props.navigation.navigate("TripPayment", {
                      from: "ride",
                    }),
                      this.setState({ isVisible: false });
                  }}
                />
              </View>
            </>
          );
        }}
      </ContextConsumer>
    );
  }
}
export default function (props) {
  return (
    <>
      <ContextConsumer>
        {(context) => <ConfirmRide {...props} context={context} />}
      </ContextConsumer>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    fontSize: RFValue(12),
    width: wp(90),
  },
  heading2: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    textAlign: "flex-start",
  },
  driverDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(80),
    alignSelf: "flex-start",
  },
  heading3: {
    fontSize: RFValue(16),
    fontWeight: "bold",

    alignSelf: "flex-start",
    textAlign: "flex-start",
  },
  block: {
    width: wp(40),
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  locations: {
    fontSize: RFValue(15),
    fontWeight: "400",
    textAlign: "flex-start",
    width: wp(80),
  },
  locationsBlock: {
    bottom: hp(3),
    marginLeft: wp(1),
    width: wp(80),
  },
});
