import React, { lazy, Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { useMutation, useQuery } from "@apollo/client";
import { NEW_REQUEST, GET_PROFILE } from "../Queries";
const Loader = lazy(() => import("../Components/Loader"));
const AddName = lazy(() => import("../Screens/AddName"));
import { GetData, StoreData } from "../GFunctions";
const BigButton = lazy(() => import("../Components/Buttons"));
const Driver = lazy(() => import("../Components/SelectDriver"));
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      destination: "",
      distance: "",
      totalAmount: "22000",
    };
  }

  render() {
    const {
      context,
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
          <BigButton
            disabled={context.state.driveruuid === "" ? true : false}
            buttonStyle={{
              width: wp(80),
              alignSelf: "center",
            }}
            titleStyle={{ fontWeight: "bold" }}
            title={"Proceed" + " " + "\n" + "R" + " " + this.state.totalAmount}
            onPress={() => {
              navigation.navigate("Payment", {
                totalAmount: this.state.totalAmount,
              }),
                newTripRequest({
                  variables: {
                    uuidUser: data && data.currentUser.uuid,
                    username: data && data.currentUser.username,
                    cellphone: data && data.currentUser.cellphone,
                    location: location,
                    destination: destination,
                    uuidDriver: context.state.driveruuid,
                  },
                });
            }}
          />
        </View>
      </>
    );
  }
}

export default function (props) {
  const [userName, setUserName] = useState("");
  const [newTripRequest] = useMutation(NEW_REQUEST);
  const { data, loading } = useQuery(GET_PROFILE, {
    onCompleted: () => {
      StoreData("useruuid", data.currentUser.uuid),
        setUserName(data.currentUser.username);
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [location, setlocation] = React.useState("");
  const [destination, setdestination] = React.useState("");
  React.useEffect(() => {
    GetData("location").then((location) => setlocation(location));
    GetData("destination").then((destination) => setdestination(destination));
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (userName === "" || userName === null) return <AddName />;
  return (
    <Confirm
      navigation={props.navigation}
      context={props.context}
      newTripRequest={newTripRequest}
      data={data}
      location={location}
      destination={destination}
    />
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
