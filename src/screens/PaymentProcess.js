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
  navigation,
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

  const {
    data: DATA,
    stopPolling,
    startPolling,
  } = useQuery(GET_DRIVER_RESPONSE, {
    variables: {
      uuidUser: "770b54ed-d8ce-49f1-9b1e-5c6cd21ae0a5",
      uuidTrip: "d7402dc9-8722-4f33-b2df-645b172a7c22",
    },
    /* pollInterval: 5000, */
    onCompleted: (driverResponse) => {
      console.log(driverResponse);
      if (driverResponse.getDriverRequestResponse != null) {
        setRequestid(driverResponse.getDriverRequestResponse.id),
          driverResponse.getDriverRequestResponse.driverduration &&
            setdriverduration(
              driverResponse.getDriverRequestResponse.driverduration
            );
        driverResponse.getDriverRequestResponse.drivername &&
          setDriverName(driverResponse.getDriverRequestResponse.drivername);
        driverResponse.getDriverRequestResponse.drivername &&
          setDriverSurName(
            driverResponse.getDriverRequestResponse.driversurname
          );
        driverResponse.getDriverRequestResponse.driverregistration &&
          setdriverregistration(
            driverResponse.getDriverRequestResponse.driverregistration
          );
        driverResponse.getDriverRequestResponse.model &&
          setModel(driverResponse.getDriverRequestResponse.model);
        requestID !== null && uuidTrip !== null && setStopQuery(true);
      } else {
        const history = useHistory();
        console.log(history);

        //navigate back to previous page if no driver response has been made
      }
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });
  const [createCheckout, { data: DATAS, loading: LOADINGS, error: ERRORS }] =
    useMutation(CREATE_CHECKOUT, {});
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
        uuidTrip: "d7402dc9-8722-4f33-b2df-645b172a7c22",
        totalAmount: totalAmount,
        paymentMethod: "Card",
      },
      /* pollInterval: 10000, */
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  React.useEffect(() => {
    async function checkConnectivity() {
      paymentMethod === "Card" && StartPolling(10000);
      await AsyncStorage.multiGet([
        "cellphone",
        "name",
        "location",
        "timeRequested",
        /*  "totalAmount", */
        "useruuid",
        "destination",
        "accessToken",
        "uuidTrip",
      ]).then((response) => {
        console.log(response);
        setclientCellNumber(response[0][1]);
        setname(response[1][1]);
        setlocation(response[2][1]);
        settimeRequested(response[3][1]);
        /* settotalAmount(response[4][1]); */
        setUSERUUID(response[4][1]);
        setdestination(response[5][1]);
        settoken(response[6][1]);
        setuuidTrip(response[7][1]);
      });
    }
    checkConnectivity();
  }, [paymentMethod]);
 /*  if (paymentMethod === "Card") {
    if (data && data.getCardPaymentResult && data.getCardPaymentResult[0]) {
      if (
        data &&
        data.getCardPaymentResult &&
        data.getCardPaymentResult[0] &&
        data.getCardPaymentResult[0].status === "Paid,WaitingDriver"
      )
        return <PaymentSuccessful />;
    }
    return (
      <View style={styles.container}>
        <SwitchPaymentTypeButton
          text="cash"
          onPress={() => {
            setpaymentMethod("Cash"), setselectedValue("Cash");
          }}
        />
        <LoadingContent />
      </View>
    );
  } */

  return (
    <>
      {requestID === null && uuidTrip === null && StopQuery === true ? (
        <SelectNewDriver
          totalAmount={totalAmount}
          navigation={props.navigation}
        />
      ) : (
        <View style={styles.container}>
          {selectedValue === "Select" && (
            <SelectPaymentMethod
              onCardPress={() => handleCardPayment()}
              onCashPress={() => {
                setpaymentMethod("Cash"), setselectedValue("Cash");
              }}
            />
          )}
          {paymentMethod === "Cash" && (
            <View style={styles.container}>
              {/* <SwitchPaymentTypeButton
                text="card"
                onPress={() => {
                  setpaymentMethod("Card"), setselectedValue("Card");
                }}
              /> */}
              <CashSelectedText text="You have chosen to pay cash, payment is due upon arrival." />
              <TripDetails
                name={name}
                clientLastName={""}
                cellphone={cellphone}
                location={location}
                destination={destination}
                driverduration={driverduration}
                driverName={driverName}
                driverSurName={driverSurname}
                model={model}
                registration={driverRegistration}
                timeRequested={timeRequested}
                selectedValue={selectedValue}
              />
              <PaymentButton
                context={props.context}
                navigation={props.navigation}
                selectedValue={selectedValue}
                setselectedCard={setselectedCard}
                paymentMethod={paymentMethod}
                totalAmount={totalAmount}
                uuidTrip={uuidTrip && uuidTrip}
                stopPolling={() => stopPolling()}
              />
            </View>
          )}

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
