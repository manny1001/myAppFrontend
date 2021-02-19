import React, { lazy, Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ContextConsumer } from "..//context/Context";
import { RFValue } from "react-native-responsive-fontsize";
import { useMutation, useQuery } from "@apollo/client";
import {
  NEW_REQUEST,
  GET_PROFILE,
  GET_DRIVERS,
} from "../../src/utilites/Queries";
import { GetData, StoreData } from "../../src/utilites/GFunctions";
import Loader from "../../src/components/Loader";
import styles from "../styles/styles";
const AddName = lazy(() => import("../../src/screens/AddName"));
const BigButton = lazy(() => import("../../src/components/Buttons"));
const Driver = lazy(() => import("../components/SelectDriver"));

export default function (props) {
  const [distance, setDistance] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState(18000);
  const [location, setlocation] = React.useState("");
  const [destination, setdestination] = React.useState("");
  const [userName, setUserName] = useState("");
  const [newTripRequest] = useMutation(NEW_REQUEST);
  const [loading, setLoading] = useState(false);
  const { data, loading: Loading } = useQuery(GET_PROFILE, {
    onCompleted: () => {
      setLoading(Loading);
      StoreData("userID", data.currentUser._id);
      StoreData("useruuid", data.currentUser.uuid),
        StoreData("name", data.currentUser.name),
        setUserName(data.currentUser.name);
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { error, data: DATA, stopPolling, startPolling } = useQuery(
    GET_DRIVERS,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      pollInterval: 200,
    }
  );
  React.useEffect(() => {
    GetData("location").then((location) => setlocation(location));
    GetData("destination").then((destination) => setdestination(destination));
  }, [DATA && DATA.allDriver]);

  if (Loading || loading) {
    return <Loader />;
  }
  if (userName === "" || userName === null) return <AddName />;
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View style={styles.container}>
            <Text style={styles.heading2}>Departure</Text>
            <Text style={styles.locations}>{location}</Text>
            <Text style={styles.heading2}>Destination</Text>
            <Text style={styles.locations}>{destination}</Text>

            {context.state.totalDriversOnline !== 0 && (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontWeight: "bold",
                  }}
                >
                  {context.state.driveruuid === "" ? `Available Drivers` : ""}
                </Text>
                {context.state.driveruuid === "" ? (
                  <Text
                    style={{
                      fontSize: RFPercentage(2.5),
                      marginLeft: wp(5),
                      fontWeight: "bold",
                    }}
                  >
                    {context.state.totalDriversOnline}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      context.dispatch({
                        type: "SAVE_DRIVERUUID",
                        driveruuid: "",
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(18),
                        fontWeight: "bold",
                      }}
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View style={{ height: hp(30) }}>
              <Driver context={context} error={error} data={DATA} />
            </View>

            <BigButton
              disabled={context.state.driveruuid === "" ? true : false}
              buttonStyle={{
                width: wp(80),
                alignSelf: "center",
              }}
              titleStyle={{ fontWeight: "bold" }}
              title={"Next" + " " + "\n" + "R" + " " + totalAmount}
              onPress={() => {
                setLoading(true),
                  stopPolling(),
                  newTripRequest({
                    variables: {
                      uuid: data && data.currentUser.uuid,
                      name: data && data.currentUser.name,
                      cellphone: data && data.currentUser.cellphone,
                      location: location,
                      destination: destination,
                      uuidDriver: context.state.driveruuid,
                    },
                  });
                setLoading(false);
                props.navigation.navigate("Payment");
              }}
            />
          </View>
        );
      }}
    </ContextConsumer>
  );
}
