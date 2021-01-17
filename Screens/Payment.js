import React, { Component, lazy } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YOURCARDS } from "../Components/selectBankCard";
import { ContextConsumer } from "../Context";
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
      departure: "",
      timeRequested: "",
      desitination: "",
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
      "departure",
      "tripFee",
      "tip",
      "total",
    ]).then((response) => {
      this.setState({ clientFirstName: response[1][1] });
      this.setState({ clientLastName: response[2][1] });
      this.setState({ clientCellNumber: response[0][1] });
      this.setState({ departure: response[4][1] });
      this.setState({ timeRequested: response[3][1] });
    });
  }

  render() {
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
              departure={this.state.departure}
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
              departure={this.state.departure}
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
            props={this.props}
            selectedValue={this.state.selectedValue}
            CustomerName={this.state.CustomerName}
            CustomerSurname={this.state.CustomerSurname}
            CustomerCell={this.state.CustomerCell}
            CustomerLocation={this.state.CustomerLocation}
            CustomerDestination={this.state.CustomerDestination}
            CustomerTimeRequested={this.state.CustomerTimeRequested}
            TripTotal={this.state.TripTotal}
            TripFee={this.state.TripFee}
            setselectedCard={this.state.setselectedCard}
            paymentMethod={this.state.paymentMethod}
            totalAmount={this.state.totalAmount}
            addRequestFunction={() => addRequestFunction}
            setisVisible={() => this.setState({ isVisible: false })}
            dispatchAddToCart={() =>
              this.props.dispatch({
                type: "ADD_TO_CART",
                payload: {
                  timeRequested: new Date()
                    .toISOString()
                    .replace(/T/, " ") // replace T with a space
                    .replace(/\..+/, ""),

                  paymentMethod: this.state.paymentMethod,
                  tripFee: this.state.tripFee.toFixed(2),
                  tip: this.state.tipAmount.toFixed(2),
                  total: this.state.totalAmount.toFixed(2),
                },
              })
            }
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
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <TrippyPayment
            {...props}
            dispatch={context.dispatch}
            state={context.state}
          />
        );
      }}
    </ContextConsumer>
  );
}
