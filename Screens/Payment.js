import React, { Component, lazy, useState } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YOURCARDS } from "../Components/selectBankCard";
import { ContextConsumer } from "../Context";
import { useQuery, useMutation } from "@apollo/client";
import Loader from "../Components/Loader";
import { NEW_REQUEST, GET_PROFILE, GET_DRIVER_RESPONSE } from "../Queries";
import { GetData } from "../GFunctions";
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
      tripFee: 55.6,
      orderAmount: 200.6,
      totalAmount: 0,
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
    const { tripFee, tipAmount } = this.state;
    this.setState({ totalAmount: tripFee + tipAmount });
    AsyncStorage.multiGet([
      "clientCellNumber",
      "clientFirstName",
      "clientLastName",
      "timeRequested",
      "location",
      "tripFee",
      "tip",
      "total",
    ]).then((response) => {
      this.setState({ clientFirstName: response[1][1] });
      this.setState({ clientLastName: response[2][1] });
      this.setState({ clientCellNumber: response[0][1] });
      this.setState({ location: response[4][1] });
      this.setState({ timeRequested: response[3][1] });
    });
  }

  render() {
    const { newTripRequest, data, location, destination } = this.props;
    const User = data;
    return (
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
              text={"You have chosen to pay cash, payment is due upon arrival."}
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
        {this.state.paymentMethod && this.state.selectedValue !== "Select" && (
          <PaymentButton
            User={User}
            props={this.props}
            selectedValue={this.state.selectedValue}
            TripTotal={this.state.TripTotal}
            TripFee={this.state.TripFee}
            setselectedCard={this.state.setselectedCard}
            paymentMethod={this.state.paymentMethod}
            totalAmount={this.state.totalAmount}
            setisVisible={() => this.setState({ isVisible: false })}
            newTripRequest={newTripRequest}
            location={location}
            destination={destination}
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
    );
  }
}

export default function (props) {
  const [newTripRequest] = useMutation(NEW_REQUEST);
  const [requestID, setRequestid] = useState("");
  const { loading, data } = useQuery(GET_PROFILE);
  const { loading: LOADING, data: DATA } = useQuery(GET_DRIVER_RESPONSE, {
    variables: { uuidUser: "7a020722-7f6c-438b-8720-83e5e94aa91a" },
    pollInterval: 500,
    onCompleted: () => {
      setRequestid(DATA.getDriverRequestResponse.id),
        console.log(DATA.getDriverRequestResponse.id);
    },
  });

  ///YOU ARE HERERERERER!!!!!!!!!!!!!!!!!!!!!!!!
  if (requestID === null) {
    console.log("Waiting response");
  }
  if (requestID !== null) {
    console.log("pAY!");
  }
  const { loading, data, error } = useQuery(GET_PROFILE, {
    notifyOnNetworkStatusChange: true,
  });
  const [location, setLocation] = useState("");
  const [destination, setdestination] = useState("");
  React.useEffect(() => {
    GetData("location").then((location) => setLocation(location));
    GetData("destination").then((destination) => setdestination(destination));
  }, []);
  if (data === undefined && error) return;
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <TrippyPayment
            {...props}
            newTripRequest={newTripRequest}
            dispatch={context.dispatch}
            state={context.state}
            location={location}
            destination={destination}
            loading={loading}
            data={data}
          />
        );
      }}
    </ContextConsumer>
  );
}
