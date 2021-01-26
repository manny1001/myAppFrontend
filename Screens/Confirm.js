import React, { lazy, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContextConsumer } from "../Context";
const BigButton = lazy(() => import("../Components/Buttons"));
const Driver = lazy(() => import("../Components/ScrollToIndexFlatlist"));
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      destination: "",
      distance: "",
      tripAmount: 25.0,
      selectedDriver: {
        name: "Manny",
        surname: "Mann",
        cellphone: "0722889887",
        picture:
          "https://firebasestorage.googleapis.com/v0/b/shop4-962e4.appspot.com/o/PicsArt_09-23-03.38.25.jpg?alt=media&token=ccd69fd1-d2bc-43f3-b788-63b7ce56d2b8",
        registration: "VCX BVN GP",
        model: "Polo",
      },
    };
  }
  componentDidMount() {
    AsyncStorage.multiGet([" location", "destination"]).then((response) => {
      this.setState({ location: response[0][1] });
      this.setState({ destination: response[1][1] });
    });
  }
  render() {
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
            <Text style={styles.locations}>{this.state.location}</Text>
          </View>

          <Text style={styles.heading2}>Destination</Text>
          <View style={styles.locationsBlock}>
            <Text style={styles.locations}>{this.state.destination}</Text>
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
        </View>
        <View
          style={{
            flex: 0.25,
            width: wp(100),
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <ContextConsumer>
            {(context) => {
              return (
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
                    this.props.navigation.navigate("Payment"),
                      context.dispatch({
                        type: "SAVE_DRIVER",
                        selectedDriver: {
                          name: "Manny",
                          surname: "Mann",
                          cellphone: "0722889887",
                          picture:
                            "https://firebasestorage.googleapis.com/v0/b/shop4-962e4.appspot.com/o/PicsArt_09-23-03.38.25.jpg?alt=media&token=ccd69fd1-d2bc-43f3-b788-63b7ce56d2b8",
                          registration: "VCX BVN GP",
                          model: "Polo",
                        },
                      });
                  }}
                />
              );
            }}
          </ContextConsumer>
        </View>
      </>
    );
  }
}
export default Confirm;

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
