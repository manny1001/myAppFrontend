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
import { LoadingContent } from "../../src/components/Loader";
import { useRoute } from "@react-navigation/native";
const AddName = lazy(() => import("../../src/screens/AddName"));
const BigButton = lazy(() => import("../../src/components/Buttons"));
const Driver = lazy(() => import("../components/SelectDriver"));
const ConfrimPresentational = lazy(() =>
  import("../components/ConfrimPresentational")
);
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
      StoreData("userID", data.currentUser._id);
      StoreData("useruuid", data.currentUser.uuid),
        StoreData("name", data.currentUser.name),
        setUserName(data.currentUser.name);
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const { error, data: DATA, stopPolling } = useQuery(GET_DRIVERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    pollInterval: 200,
  });
  React.useEffect(() => {
    GetData("location").then((location) => setlocation(location));
    GetData("destination").then((destination) => setdestination(destination));
  }, [DATA && DATA.allDriver]);
  if (Loading || loading) {
    return <LoadingContent />;
  }
  if (userName === null || userName.length === 0) return <AddName />;
  return (
    <ConfrimPresentational
      {...props}
      data={data}
      newTripRequest={newTripRequest}
      stopPolling={() => stopPolling()}
      destination={destination}
      location={location}
      error={error}
      DATA={DATA}
    />
  );
}
