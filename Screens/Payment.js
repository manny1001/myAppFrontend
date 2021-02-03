import React, { Component, lazy, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YOURCARDS } from "../Components/selectBankCard";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "../Components/Loader";
import {
  NEW_REQUEST,
  GET_PROFILE,
  GET_DRIVER_RESPONSE,
  PAYMENT_CONFIRMATION,
} from "../Queries";
const PaymentButton = lazy(() => import("../Components/PaymentButton"));
const YourBankCardsList = lazy(() => import("../Components/YourBankCardsList"));
const SelectPaymentMethod = lazy(() =>
  import("../Components/SelectPaymentMethod")
);
const PaymentMethodHeader = lazy(() =>
  import("../Components/PaymentMethodHeader")
);
const CashSelectedText = lazy(() => import("../Components/CashSelectedText"));
const TripDetails = lazy(() => import("../Components/TripDetails"));
const CancelSelectedCard = lazy(() =>
  import("../Components/CancelSelectedCard")
);
const SelectedbankCardAndTripDetails = lazy(() =>
  import("../Components/SelectedbankCardAndTripDetails")
);
const AddACard = lazy(() => import("../Components/AddACard"));
const SelectNewDriver = lazy(() => import("../Components/SelectNewDriver"));
class TrippyPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientCellNumber: "",
      clientFirstName: "",
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
    AsyncStorage.multiGet([
      "clientCellNumber",
      "clientFirstName",
      "clientLastName",
      "timeRequested",
      "location",
      "totalAmount",
      "tip",
    ]).then((response) => {
      this.setState({ clientFirstName: response[1][1] });
      this.setState({ clientLastName: response[2][1] });
      this.setState({ clientCellNumber: response[0][1] });
      this.setState({ location: response[4][1] });
      this.setState({ timeRequested: response[3][1] });
      this.setState({ totalAmount: response[6][1] });
    });
  }

  render() {
    const {
      PayOrConfirm,
      uuidTrip,
      totalAmount,
      requestID,
      StopQuery,
      setStopQuery,
    } = this.props;
    const { navigation } = this.props.props;
    return (
      <>
        {requestID === null && uuidTrip === null && StopQuery === true ? (
          <SelectNewDriver totalAmount={totalAmount} navigation={navigation} />
        ) : (
          <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            {/* Cash or Card header depending on selection */}
            <PaymentMethodHeader
              selectedValue={this.state.selectedValue}
              onValueChange={(val) => {
                this.setState({ cardselected: false });
                this.setState({ selectedValue: val }),
                  this.setState({ paymentMethod: val });
              }}
            />
            {/*Select you payment method */}
            {this.state.selectedValue === "Select" && (
              <SelectPaymentMethod
                onCardPress={() =>
                  this.setState({
                    paymentMethod: "Card",
                    selectedValue: "Card",
                  })
                }
                onCashPress={() =>
                  this.setState({
                    paymentMethod: "Cash",
                    selectedValue: "Cash",
                  })
                }
              />
            )}
            {/* Payment method CASH*/}
            {this.state.paymentMethod === "Cash" && (
              <>
                <CashSelectedText
                  text={
                    "You have chosen to pay cash, payment is due upon arrival."
                  }
                />
                <TripDetails
                  selectedValue={this.state.selectedValue}
                  clientFirstName={this.state.clientFirstName}
                  clientLastName={this.state.clientLastName}
                  clientCellNumber={this.state.clientCellNumber}
                  location={this.state.location}
                  timeRequested={this.state.timeRequested}
                />
              </>
            )}
            {/* Payment Card and Card NOT Selected */}
            {this.state.selectedValue === "Card" &&
              this.state.cardselected === false && (
                <YourBankCardsList
                  setcardselected={() => this.setState({ cardselected: true })}
                  setselectedCard={this.setselectedCard}
                  props={this.props}
                  closeModal={() => (
                    this.props.navigation.navigate("Settings"),
                    this.setState({ isVisible: false })
                  )}
                />
              )}
            {/* Payment Card and Card Selected */}
            {this.state.paymentMethod === "Card" &&
              this.state.cardselected === true && (
                <SelectedbankCardAndTripDetails
                  setselectedCard={this.state.setselectedCard}
                  selectedValue={this.state.selectedValue}
                  clientFirstName={this.state.clientFirstName}
                  clientLastName={this.state.clientLastName}
                  clientCellNumber={this.state.clientCellNumber}
                  location={this.state.location}
                  timeRequested={this.state.timeRequested}
                />
              )}
            {/* No saved Cards, Add a Card*/}
            {YOURCARDS.length === 0 && this.state.paymentMethod === "Card" && (
              <AddACard
                logos={"none"}
                cardName={this.state.cardName}
                cardNumber={this.state.cardNumber}
                months={this.state.months}
                year={this.state.year}
                cvv={this.state.cvv}
                doneEditing={this.state.doneEditing}
              />
            )}
            {/* Show button for payment method CASH or CARD*/}
            {this.state.paymentMethod &&
              this.state.selectedValue !== "Select" && (
                <PaymentButton
                  context={this.props.context}
                  navigation={navigation}
                  PayOrConfirm={PayOrConfirm}
                  selectedValue={this.state.selectedValue}
                  setselectedCard={this.state.setselectedCard}
                  paymentMethod={this.state.paymentMethod}
                  totalAmount={totalAmount}
                  uuidTrip={uuidTrip && uuidTrip}
                />
              )}
            {/*       Cancel selected Card */}
            {this.state.paymentMethod === "Card" &&
              this.state.cardselected === true && (
                <CancelSelectedCard
                  onPress={() => {
                    this.setState({ cardselected: false }),
                      this.setState({ setselectedCard: null });
                  }}
                />
              )}
          </View>
        )}
      </>
    );
  }
}

export default function (props) {
  const totalAmount = props.props.route.params.totalAmount;
  const [PayOrConfirm] = useMutation(PAYMENT_CONFIRMATION);
  const [StopQuery, setStopQuery] = useState(false);
  const [requestID, setRequestid] = useState(null);
  const [uuidTrip, setuuidTrip] = useState(null);
  const { data } = useQuery(GET_PROFILE);
  const [timeOutValue, setTimeoutValue] = React.useState(120);
  const { data: DATA, stopPolling, startPolling } = useQuery(
    GET_DRIVER_RESPONSE,
    {
      variables: { uuidUser: data && data.currentUser.uuid },
      pollInterval: 500,
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
  );
}
