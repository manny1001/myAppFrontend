import React, { lazy, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@apollo/client";
import { NEW_REQUEST, GET_PROFILE } from "../Queries";
import { ContextConsumer } from "../Context";
import { GetData } from "../GFunctions";
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

  render() {
    const {
      newTripRequest,
      data,
      location,
      destination,
      navigation,
    } = this.props;
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
            <Text style={styles.locations}>{location}</Text>
          </View>

          <Text style={styles.heading2}>Destination</Text>
          <View style={styles.locationsBlock}>
            <Text style={styles.locations}>{destination}</Text>
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
                    navigation.navigate("Payment"),
                      newTripRequest({
                        variables: {
                          uuidUser: data && data.currentUser.uuid,
                          username: data && data.currentUser.username,
                          cellphone: data && data.currentUser.cellphone,
                          location: location,
                          destination: destination,
                        },
                      });
                    /*  context.dispatch({
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
                      }), */
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
export default function (props) {
  const [newTripRequest] = useMutation(NEW_REQUEST);
  const { loading, data } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
  });
  const [location, setdeparture] = React.useState("");
  const [destination, setdestination] = React.useState("");
  React.useEffect(() => {
    GetData(" location").then((location) => setdeparture(location));
    GetData("destination").then((destination) => setdestination(destination));
  }, []);
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <Confirm
            {...props}
            newTripRequest={newTripRequest}
            data={data}
            location={location}
            destination={destination}
          />
        );
      }}
    </ContextConsumer>
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
