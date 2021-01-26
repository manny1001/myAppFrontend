import React, { Component, lazy } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Loader from "../Components/Loader";
import { NEW_REQUEST } from "../Queries";
import { GetData } from "../GFunctions";
const BigButton = lazy(() => import("../Components/Buttons"));
const PaymentButton = ({
  CustomerLocation,
  CustomerDestination,
  CustomerTimeRequested,
  TripTotal,
  TripFee,
  setselectedCard,
  paymentMethod,
  totalAmount,
  selectedValue,
  props,
}) => {
  const GET_PROFILE = gql`
    query getProfile {
      currentUser {
        id
        username
        cellphone
        homeaddress
        workaddress
      }
    }
  `;

  const GETPROFILE = () => {
    const { loading, data } = useQuery(GET_PROFILE, {
      notifyOnNetworkStatusChange: true,
    });
    if (loading && data === undefined) return <Loader />;
    return data;
  };
  const User = GETPROFILE();
  const FETCH = () => {
    const [addRequest] = useMutation(NEW_REQUEST);
    return addRequest;
  };
  const addRequestFunction = FETCH();

  console.log(User);
  return (
    <BigButton
      icon={<Icon name="Safety" size={24} color="black" />}
      disabled={!setselectedCard && selectedValue === "Card" ? true : false}
      buttonStyle={{
        width: wp(80),
        alignSelf: "center",
      }}
      titleStyle={{ fontWeight: "bold" }}
      title={
        paymentMethod === "Cash"
          ? "Confirm" + " " + "\n" + "R" + " " + totalAmount.toFixed(2)
          : "Pay" + " " + "\n" + "R" + " " + totalAmount.toFixed(2)
      }
      onPress={() => {
        addRequestFunction({
          variables: {
            customername: User.currentUser.username,
            customercellphone: User.currentUser.cellphone,
            CustomerLocation: CustomerLocation,
            CustomerDestination: CustomerDestination,
            CustomerTimeRequested: CustomerTimeRequested,
            TripTotal: TripTotal,
            TripFee: TripFee,
            TripStatus: "Pending Driver Response",
          },
        }),
          props.navigation.navigate("TrackDriver");
        /*  console.log(props.navigation); */
      }}
    />
  );
};

export default PaymentButton;
