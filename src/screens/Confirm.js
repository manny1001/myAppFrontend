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
import { NEW_REQUEST, GET_PROFILE } from "../../src/utilites/Queries";
import { GetData, StoreData } from "../../src/utilites/GFunctions";
import Loader from "../../src/components/Loader";
import styles from "../styles/styles";
const AddName = lazy(() => import("../../src/screens/AddName"));
const BigButton = lazy(() => import("../../src/components/Buttons"));
const Driver = lazy(() => import("../components/SelectDriver"));

export default function (props) {
  const [distance, setDistance] = React.useState("");
  const [totalAmount, setTotalAmount] = React.useState("");
  const [location, setlocation] = React.useState("");
  const [destination, setdestination] = React.useState("");
  const [userName, setUserName] = useState("");
  const [newTripRequest] = useMutation(NEW_REQUEST);
  const { data, loading } = useQuery(GET_PROFILE, {
    onCompleted: () => {
      StoreData("userID", data.currentUser._id);
      StoreData("useruuid", data.currentUser.uuid),
        setUserName(data.currentUser.name);
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  React.useEffect(() => {
    GetData("location").then((location) => setlocation(location));
    GetData("destination").then((destination) => setdestination(destination));
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (userName === "" || userName === null) return <AddName />;
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <>
            <View style={styles.container}>
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
              {context.state.totalDriversOnline !== 0 && (
                <View
                  style={{
                    flex: 0.5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      fontWeight: "bold",
                      alignSelf: "flex-start",
                    }}
                  >
                    {context.state.driveruuid === "" ? `Available Drivers` : ""}
                  </Text>
                  {context.state.driveruuid === "" ? (
                    <Text
                      style={{
                        fontSize: RFPercentage(2.5),
                        marginRight: wp(3),
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

              <Driver context={context} />
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
                title={"Proceed" + " " + "\n" + "R" + " " + totalAmount}
                onPress={() => {
                  props.navigation.navigate("Payment", {
                    totalAmount: totalAmount,
                  }),
                    newTripRequest({
                      variables: {
                        uuidUser: data && data.currentUser.uuid,
                        name: data && data.currentUser.name,
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
      }}
    </ContextConsumer>
  );
  /* return (
    <Confirm
      navigation={navigation}
      context={context}
      newTripRequest={newTripRequest}
      data={data}
      location={location}
      destination={destination}
      userID={data.currentUser._id}
    />
  ); */
}
