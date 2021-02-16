import React, { lazy, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "../../src/components/Loader";
import { GetData, StoreData } from "../../src/utilites/GFunctions";
import {
  GET_DRIVER_RESPONSE,
  PAYMENT_CONFIRMATION,
} from "../../src/utilites/Queries";
import styles from "../styles/styles";
const PaymentButton = lazy(() => import("../../src/components/PaymentButton"));
const SelectPaymentMethod = lazy(() =>
  import("../components/SelectPaymentMethod")
);
const PaymentMethodHeader = lazy(() =>
  import("../components/PaymentMethodHeader")
);
const CashSelectedText = lazy(() => import("../components/CashSelectedText"));
const TripDetails = lazy(() => import("../components/TripDetails"));

const SelectNewDriver = lazy(() => import("../components/SelectNewDriver"));
export default function (props) {
  const [userUUID, setUSERUUID] = React.useState("");
  const [cellphone, setclientCellNumber] = React.useState("");
  const [name, setname] = React.useState("");
  const [location, setlocation] = React.useState("");
  const [timeRequested, settimeRequested] = React.useState("");
  const [destination, setdestination] = React.useState("");
  const [selectedValue, setselectedValue] = React.useState("Select");
  const [paymentMethod, setpaymentMethod] = React.useState(null);
  const [totalAmount, settotalAmount] = React.useState("88 000");
  const [StopQuery, setStopQuery] = useState(false);
  const [requestID, setRequestid] = useState(null);
  const [uuidTrip, setuuidTrip] = useState(null);
  const [timeOutValue, setTimeoutValue] = React.useState(500);
  const [selectedcard, setselectedCard] = React.useState(null);
  const [driverName, setDriverName] = React.useState(null);
  const [driverSurname, setDriverSurName] = React.useState(null);
  const [driverduration, setdriverduration] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [driverRegistration, setdriverregistration] = React.useState(null);
  const [PayOrConfirm] = useMutation(PAYMENT_CONFIRMATION);
  const { data: DATA, stopPolling, startPolling } = useQuery(
    GET_DRIVER_RESPONSE,
    {
      variables: { uuidUser: userUUID },
      pollInterval: 500,
      onCompleted: () => {
        console.log(DATA);
        setRequestid(DATA.getDriverRequestResponse.id),
          setuuidTrip(DATA.getDriverRequestResponse.uuidTrip),
          DATA.getDriverRequestResponse.uuidTrip &&
            StoreData("uuidTrip", DATA.getDriverRequestResponse.uuidTrip);
        DATA.getDriverRequestResponse.driverduration &&
          setdriverduration(DATA.getDriverRequestResponse.driverduration);
        DATA.getDriverRequestResponse.drivername &&
          setDriverName(DATA.getDriverRequestResponse.drivername);
        DATA.getDriverRequestResponse.drivername &&
          setDriverSurName(DATA.getDriverRequestResponse.driversurname);
        DATA.getDriverRequestResponse.driverregistration &&
          setdriverregistration(
            DATA.getDriverRequestResponse.driverregistration
          );
        DATA.getDriverRequestResponse.model &&
          setModel(DATA.getDriverRequestResponse.model);
        requestID !== null && uuidTrip !== null && setStopQuery(true);
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );
  React.useEffect(() => {
    AsyncStorage.multiGet([
      "cellphone",
      "name",
      "location",
      "timeRequested",
      "totalAmount",
      "useruuid",
      "destination",
    ]).then((response) => {
      setclientCellNumber(response[0][1]);
      setname(response[1][1]);
      setlocation(response[2][1]);
      settimeRequested(response[3][1]);
      settotalAmount(response[4][1]);
      setUSERUUID(response[5][1]);
      setdestination(response[6][1]);
    });
  }, []);
  React.useEffect(() => {
    const Value = setTimeout(() => setTimeoutValue(timeOutValue - 1), 1000);
    if (timeOutValue === 0) {
      clearTimeout(Value);
      setStopQuery(true);
      props.context.dispatch({ type: "SAVE_DRIVERUUID", driveruuid: "" });
    }

    StopQuery === true && stopPolling();
    StopQuery === false && startPolling();
  }, [StopQuery, timeOutValue]);
  if (requestID === null && uuidTrip === null && StopQuery === false)
    return <Loader />;
  return (
    <>
      {requestID === null && uuidTrip === null && StopQuery === true ? (
        <SelectNewDriver
          totalAmount={totalAmount}
          navigation={props.navigation}
        />
      ) : (
        <View style={styles.container}>
          {/* Cash or Card header depending on selection */}
          <PaymentMethodHeader
            selectedValue={selectedValue}
            onValueChange={(val) => {
              setcardselected(false),
                setselectedValue(val),
                setpaymentMethod(val);
            }}
          />
          {/*Select you payment method */}
          {selectedValue === "Select" && (
            <SelectPaymentMethod
              onCardPress={() => {
                alert("Working on this method,Please choose cash for now");
              }}
              onCashPress={() => {
                setpaymentMethod("Cash"), setselectedValue("Cash");
              }}
            />
          )}
          {/* Payment method CASH*/}
          {paymentMethod === "Cash" && (
            <>
              <CashSelectedText
                text={
                  "You have chosen to pay cash, payment is due upon arrival."
                }
              />
              <TripDetails
                destination={destination}
                driverduration={driverduration}
                driverName={driverName}
                driverSurName={driverSurname}
                model={model}
                registration={driverRegistration}
                selectedValue={selectedValue}
                name={name}
                clientLastName={""}
                cellphone={cellphone}
                location={location}
                timeRequested={timeRequested}
              />
            </>
          )}

          {/* Show button for payment method CASH or CARD*/}
          {paymentMethod && selectedValue !== "Select" && (
            <PaymentButton
              context={props.props.context}
              navigation={props.props.navigation}
              PayOrConfirm={PayOrConfirm}
              selectedValue={selectedValue}
              setselectedCard={setselectedCard}
              paymentMethod={paymentMethod}
              totalAmount={totalAmount}
              uuidTrip={uuidTrip && uuidTrip}
            />
          )}
          {/*       Cancel selected Card */}
          {paymentMethod === "Card" && cardselected === true && (
            <CancelSelectedCard
              onPress={() => {
                setcardselected(false), setSelectedcard(null);
              }}
            />
          )}
        </View>
      )}
    </>
  );
}
