import {
  React,
  View,
  Text,
  Button,
  AsyncStorage,
  useQuery,
  useMutation,
  LoadingContent,
  StoreData,
  WebBrowser,
  GET_DRIVER_RESPONSE,
  PAYMENT_CONFIRMATION,
  GET_CARD_PAYMENT_RESULT,
  CREATE_CHECKOUT,
  styles,
  SwitchPaymentTypeButton,
  PaymentButton,
  CashSelectedText,
  TripDetails,
  SelectNewDriver,
  PaymentMethodHeader,
  PaymentSuccessful,
  useState,
  SelectPaymentMethod,
} from "../api/constants/";

export default function (props) {
  const [userUUID, setUSERUUID] = React.useState("");
  const [cellphone, setclientCellNumber] = React.useState("");
  const [name, setname] = React.useState("");
  const [location, setlocation] = React.useState("");
  const [timeRequested, settimeRequested] = React.useState("");
  const [destination, setdestination] = React.useState("");
  const [selectedValue, setselectedValue] = React.useState("Select");
  const [paymentMethod, setpaymentMethod] = React.useState("");
  const [totalAmount, settotalAmount] = React.useState("88000");
  const [StopQuery, setStopQuery] = useState(false);
  const [requestID, setRequestid] = useState(null);
  const [timeOutValue, setTimeoutValue] = React.useState(500);
  const [selectedcard, setselectedCard] = React.useState(null);
  const [driverName, setDriverName] = React.useState(null);
  const [driverSurname, setDriverSurName] = React.useState(null);
  const [cardselected, setcardselected] = React.useState(false);
  const [driverduration, setdriverduration] = React.useState(null);
  const [model, setModel] = React.useState(null);
  const [uuidTrip, setuuidTrip] = React.useState(null);

  const [driverRegistration, setdriverregistration] = React.useState(null);
  const [token, settoken] = useState(null);
  const [PayOrConfirm] = useMutation(PAYMENT_CONFIRMATION);

  const { data: DATA, stopPolling, startPolling } = useQuery(
    GET_DRIVER_RESPONSE,
    {
      variables: { uuidUser: userUUID, uuidTrip: uuidTrip },
      pollInterval: 150,
      onCompleted: () => {
        setRequestid(DATA.getDriverRequestResponse.id),
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
  const [
    createCheckout,
    { data: DATAS, loading: LOADINGS, error: ERRORS },
  ] = useMutation(CREATE_CHECKOUT, {});

  const handleCardPayment = async () => {
    setpaymentMethod("Card");
    await createCheckout().then((checkout) => {
      WebBrowser.openBrowserAsync(
        `http://drippypayments.netlify.app/?${token}?${totalAmount}?${uuidTrip}?${checkout.data.createCheckoutSession.id}`
      );
    });
  };
  const { data, startPolling: StartPolling } = useQuery(
    GET_CARD_PAYMENT_RESULT,
    {
      skip: true,
      variables: {
        uuidTrip: "d80602cd-87fc-40d6-aca7-25fe02388107",
        totalAmount: "88000",
        paymentMethod: "Card",
      },
      pollInterval: 500,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  React.useEffect(() => {
    paymentMethod === "Card" && StartPolling(500);
    AsyncStorage.multiGet([
      "cellphone",
      "name",
      "location",
      "timeRequested",
      "totalAmount",
      "useruuid",
      "destination",
      "accessToken",
      "uuidTrip",
    ]).then((response) => {
      setclientCellNumber(response[0][1]);
      setname(response[1][1]);
      setlocation(response[2][1]);
      settimeRequested(response[3][1]);
      /* settotalAmount(response[4][1]); */
      setUSERUUID(response[5][1]);
      setdestination(response[6][1]);
      settoken(response[7][1]);
      setuuidTrip(response[8][1]);
    });
  }, [paymentMethod]);
  React.useEffect(() => {
    //CountDown timer for driver to respond
    /* const Value = setTimeout(() => setTimeoutValue(timeOutValue - 1), 1000);
    if (timeOutValue === 0) {
      clearTimeout(Value);
      setStopQuery(true);
      props.context.dispatch({ type: "SAVE_DRIVERUUID", driveruuid: "" });
    } */

    StopQuery === true && stopPolling();
    StopQuery === false && startPolling();
  }, [StopQuery, timeOutValue]);
  console.log(requestID);
  if (requestID === null) return <LoadingContent />;
  if (LOADINGS) return <LoadingContent />;
  if (paymentMethod === "Card" && !data.getCardPaymentResult[0]) {
    if (data && data.getCardPaymentResult[0]) {
      if (data && data.getCardPaymentResult[0].status === "Paid,WaitingDriver")
        return <PaymentSuccessful />;
    }
    return (
      <View style={styles.container}>
        <SwitchPaymentTypeButton
          text={"cash"}
          onPress={() => {
            setpaymentMethod("Cash"), setselectedValue("Cash");
          }}
        />
        <LoadingContent />
      </View>
    );
  }

  return (
    <>
      {requestID === null && uuidTrip === null && StopQuery === true ? (
        <SelectNewDriver
          totalAmount={totalAmount}
          navigation={props.navigation}
        />
      ) : (
        <View style={styles.container}>
          {/*Select you payment method */}
          {selectedValue === "Select" && (
            <SelectPaymentMethod
              onCardPress={() => handleCardPayment()}
              onCashPress={() => {
                setpaymentMethod("Cash"), setselectedValue("Cash");
              }}
            />
          )}
          {/* Payment method CASH*/}
          {paymentMethod === "Cash" && (
            <>
              <SwitchPaymentTypeButton
                text={"card"}
                onPress={() => {
                  setpaymentMethod("Card"), setselectedValue("Card");
                }}
              />
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
              stopPolling={() => stopPolling()}
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
