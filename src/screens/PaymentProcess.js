import React, { Component, lazy, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YOURCARDS } from "../../Components/selectBankCard";
import { GetData, StoreData } from "../../GFunctions";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "../../Components/Loader";
import {
  GET_PROFILE,
  GET_DRIVER_RESPONSE,
  PAYMENT_CONFIRMATION,
} from "../../Queries";
const PaymentButton = lazy(() => import("../../Components/PaymentButton"));
const YourBankCardsList = lazy(() =>
  import("../../Components/YourBankCardsList")
);
const SelectPaymentMethod = lazy(() =>
  import("../../Components/SelectPaymentMethod")
);
const PaymentMethodHeader = lazy(() =>
  import("../../Components/PaymentMethodHeader")
);
const CashSelectedText = lazy(() =>
  import("../../Components/CashSelectedText")
);
const TripDetails = lazy(() => import("../../Components/TripDetails"));
const CancelSelectedCard = lazy(() =>
  import("../../Components/CancelSelectedCard")
);
const SelectedbankCardAndTripDetails = lazy(() =>
  import("../../Components/SelectedbankCardAndTripDetails")
);
const AddACard = lazy(() => import("../../Components/AddACard"));
const SelectNewDriver = lazy(() => import("../../Components/SelectNewDriver"));
/* class TrippyPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientCellNumber: "",
      name: "",
      clientLastName: "",
      location: "",
      timeRequested: "",
      destination: "",
      isVisible: true,
      tipModalVisible: false,
      tipAdded: false,
      tipAmount: 0,
      totalAmount: null,
      orderAmount: 200.6,
      selectedValue: "Select",
      paymentMethod: null,
      value: null,
      methodSelected: true,
      cardName: "",
      cardNumber: "",
      months: "",
      year: "",
      cvv: "",
      doneEditing: "",
      setselectedCard: null,
      cardselected: false,
    };
  }
  setselectedCard = (val) => {
    this.setState({ setselectedCard: val });
  };

  componentDidMount() {
   
  }

  render() {
    const {
      PayOrConfirm,
      uuidTrip,
      totalAmount,
      requestID,
      StopQuery,
    } = this.props;
    const { navigation } = this.props.props;
  }
} */

export default function (props) {
  const [clientCellNumber, setclientCellNumber] = React.useState("");
  const [name, setname] = React.useState("");
  const [location, setlocation] = React.useState("");
  const [timeRequested, settimeRequested] = React.useState("");
  const [destination, setdestination] = React.useState("");
  const [isVisible, setisVisible] = React.useState(true);
  const [tipModalVisible, settipModalVisible] = React.useState(false);
  const [tipAdded, settipAdded] = React.useState(false);
  const [tipAmount, settipAmount] = React.useState(0);
  const [orderAmount, setorderAmount] = React.useState("");
  const [selectedValue, setselectedValue] = React.useState("Select");
  const [paymentMethod, setpaymentMethod] = React.useState(null);
  const [value, setvalue] = React.useState(null);
  const [methodSelected, setmethodSelected] = React.useState(true);
  const [cardName, setcardName] = React.useState("");
  const [cardNumber, setcardNumber] = React.useState("");
  const [months, setmonths] = React.useState("");
  const [year, setyear] = React.useState("");
  const [cvv, setcvv] = React.useState("");
  const [doneEditing, setdoneEditing] = React.useState("");
  const [selectedcard, setselectedCard] = React.useState(null);
  const [cardselected, setcardselected] = React.useState(false);
  const [totalAmount, settotalAmount] = React.useState(null);

  const [PayOrConfirm] = useMutation(PAYMENT_CONFIRMATION);
  const [StopQuery, setStopQuery] = useState(false);
  const [requestID, setRequestid] = useState(null);
  const [uuidTrip, setuuidTrip] = useState(null);
  const [timeOutValue, setTimeoutValue] = React.useState(120);
  /*  const setselectedCard = (val) => {
    this.setState({ setselectedCard: val });
  }; */

  const { data } = useQuery(GET_PROFILE);
  const { data: DATA, stopPolling, startPolling } = useQuery(
    GET_DRIVER_RESPONSE,
    {
      variables: { uuidUser: data && data.currentUser.uuid },
      /*  pollInterval: 500, */
      onCompleted: () => {
        console.log(DATA),
          setRequestid(DATA.getDriverRequestResponse.id),
          setuuidTrip(DATA.getDriverRequestResponse.uuidTrip),
          requestID !== null && uuidTrip !== null && setStopQuery(true);
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );
  React.useEffect(() => {
    AsyncStorage.multiGet([
      "clientCellNumber",
      "clientFirstName",
      "location",
      "timeRequested",
      "totalAmount",
    ]).then((response) => {
      setclientCellNumber(response[0][1]);
      setname(response[1][1]);
      setlocation(response[2][1]);
      settimeRequested(response[3][1]);
      settotalAmount(response[4][1]);
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
        <SelectNewDriver totalAmount={totalAmount} navigation={navigation} />
      ) : (
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
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
                selectedValue={selectedValue}
                name={name}
                clientLastName={""}
                clientCellNumber={clientCellNumber}
                location={location}
                timeRequested={timeRequested}
              />
            </>
          )}
          {/* Payment Card and Card NOT Selected */}
          {/*  {selectedValue === "Card" && cardselected === false && (
            <YourBankCardsList
              selectedCard={selectedcard}
              setcardselected={() => setcardselected(true)}
              setselectedCard={(val) => setselectedCard(val)}
              props={props}
              closeModal={() => (
                props.navigation.navigate("Settings"),
                this.setState({ isVisible: false })
              )}
            />
          )} */}
          {/* Payment Card and Card Selected */}
          {/* {paymentMethod === "Card" && cardselected === true && (
            <SelectedbankCardAndTripDetails
              selectedCard={selectedcard}
              selectedValue={selectedValue}
              name={name}
              clientLastName={""}
              clientCellNumber={clientCellNumber}
              location={location}
              timeRequested={timeRequested}
            />
          )} */}
          {/* No saved Cards, Add a Card*/}
          {/* {YOURCARDS.length === 0 && paymentMethod === "Card" && (
            <AddACard
              logos={"none"}
              cardName={cardName}
              cardNumber={cardNumber}
              months={months}
              year={year}
              cvv={cvv}
              doneEditing={doneEditing}
            />
          )} */}
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
  /* return (
    <TrippyPayment
      {...props}
      PayOrConfirm={PayOrConfirm}
      dispatch={props.context.dispatch}
      uuidTrip={uuidTrip && uuidTrip}
      totalAmount={totalAmount}
      requestID={requestID}
      StopQuery={StopQuery}
      setStopQuery={setStopQuery}
    />
  ); */
}
