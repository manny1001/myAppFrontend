import React, { Component, lazy } from "react";
import { View, Text, TouchableOpacity, Button, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import SelectBankCard, { YOURCARDS } from "../Components/selectBankCard";
import Icon from "react-native-vector-icons/AntDesign";
import { ContextConsumer } from "../Context";
import { useMutation } from "@apollo/client";
import { ADDCARD } from "./AddBankCard";
import { Item } from "../Components/selectBankCard";
import { TextInput } from "react-native-paper";
import { NEW_REQUEST } from "../Queries";
const SelectedPaymentMethod = lazy(() =>
  import("../Components/SelectedPaymentMethod")
);
const PaymentMethodHeader = lazy(() =>
  import("../Components/PaymentMethodHeader")
);
const CashSelectedText = lazy(() => import("../Components/CashSelectedText"));
const TripDetails = lazy(() => import("../Components/TripDetails"));
const BigButton = lazy(() => import("../Components/Buttons"));
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

  PaymentButton = () => {
    const { addRequestFunction } = this.props;
    return (
      <BigButton
        icon={<Icon name="Safety" size={24} color="black" />}
        disabled={
          !this.state.setselectedCard && this.state.selectedValue === "Card"
            ? true
            : false
        }
        buttonStyle={{
          width: wp(80),
          alignSelf: "center",
        }}
        titleStyle={{ fontWeight: "bold" }}
        title={
          this.state.paymentMethod === "Cash"
            ? "Confirm" +
              " " +
              "\n" +
              "R" +
              " " +
              this.state.totalAmount.toFixed(2)
            : "Pay" + " " + "\n" + "R" + " " + this.state.totalAmount.toFixed(2)
        }
        onPress={() => {
          addRequestFunction({
            variables: {
              CustomerName: this.state.clientFirstName,
              CustomerSurname: this.state.clientLastName,
              CustomerCell: this.state.clientCellNumber,
              CustomerLocation: this.state.departure,
              CustomerDestination: this.state.desitination,
              CustomerTimeRequested: this.state.timeRequested,
              TripTotal: this.state.totalAmount,
              TripFee: this.state.tripFee,
              TripStatus: "Pending Driver Response",
            },
          }),
            this.props.navigation.navigate("TrackDriver"),
            this.setState({ isVisible: false }),
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
            });
        }}
      />
    );
  };

  CancelSelectedCard = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ cardselected: false }),
            this.setState({ setselectedCard: null });
        }}
        style={{
          position: "absolute",
          top: hp(28),
          marginLeft: wp(85),
        }}
      >
        <MaterialIcons name="cancel" size={wp(10)} color="black" />
        <Text style={{ alignSelf: "center", fontWeight: "bold" }}>No</Text>
      </TouchableOpacity>
    );
  };
  SelectedBankCard = () => {
    return (
      <View
        style={{
          width: wp(70),
          height: hp(20),
          alignSelf: "center",
          justifyContent: "space-evenly",
        }}
      >
        {this.state.setselectedCard !== null && (
          <Text style={{ fontWeight: "bold", alignSelf: "center" }}>
            You chose to pay with
          </Text>
        )}
        <Item
          touchable={false}
          height={hp(17)}
          title={this.state.setselectedCard.title}
          mm={this.state.setselectedCard.mm}
          cvv={this.state.setselectedCard.cvv}
          cardNumber={this.state.setselectedCard.cardNumber}
          cardName={this.state.setselectedCard.cardName}
        />
      </View>
    );
  };

  YourBankCardsList = () => {
    return (
      <SelectBankCard
        style={{
          alignSelf: "center",
          justifyContent: "center",
        }}
        setcardselected={() => this.setState({ cardselected: true })}
        setselectedCard={this.setselectedCard}
        props={this.props}
        closeModal={() => (
          this.props.navigation.navigate("Settings"),
          this.setState({ isVisible: false })
        )}
      />
    );
  };
  AddACard = () => {
    return (
      <ADDCARD
        style={{
          height: hp(38),
          width: wp(85),
          alignSelf: "center",
        }}
        logos={"none"}
        cardName={this.state.cardName}
        cardNumber={this.state.cardNumber}
        months={this.state.months}
        year={this.state.year}
        cvv={this.state.cvv}
        doneEditing={this.state.doneEditing}
      />
    );
  };
  SelectedbankCardAndTripDetails = () => {
    return (
      <View
        style={{
          width: wp(90),
          alignSelf: "center",
          flex: 0.6,
        }}
      >
        {this.state.setselectedCard !== null && this.SelectedBankCard()}

        {this.TripDetails()}
      </View>
    );
  };
  AddTipModal = () => {
    return (
      <Modal
        onBackdropPress={() => this.setState({ visibleModal: false })}
        backgroundColor="transparent"
        visible={this.state.tipModalVisible}
      >
        <View
          style={{
            backgroundColor: "#f5f5f5",
            height: hp(100),
            width: wp(100),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(22),
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Add a tip
          </Text>

          <View
            style={{
              width: wp(50),
              flexDirection: "row",
              alignSelf: "center",
              marginTop: hp(10),
              marginBottom: hp(10),
            }}
          >
            <Text
              style={{
                fontSize: RFValue(22),

                alignSelf: "center",
              }}
            >
              R
            </Text>
            <TextInput
              mode={"flat"}
              style={{
                marginTop: hp(2),
                marginLeft: wp(7),
                width: wp(30),
                backgroundColor: "transparent",
                color: "black",
                fontSize: RFValue(16),
                height: hp(5),
                alignSelf: "center",
              }}
              onChangeText={(text) => {
                {
                  text === "" && this.setState({ tipAmount: 0 });
                }
                {
                  text !== "" && this.setState({ tipAmount: parseFloat(text) });
                }
              }}
            />
          </View>
          <BigButton
            disabled={this.state.tipAmount === 0 ? true : false}
            onPress={() => {
              this.setState({ tipModalVisible: false }),
                this.setState({ tipAdded: true }),
                this.setState({
                  totalAmount: this.state.tipAmount + this.state.tripFee,
                });
            }}
            buttonStyle={{
              height: hp(10),
              width: wp(80),
              alignSelf: "center",
            }}
            title={"Add"}
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({ tipAmount: 0 }),
                this.setState({ tipModalVisible: false });
            }}
            style={{
              marginTop: hp(5),

              position: "absolute",
              top: 0,
              marginLeft: wp(10),
            }}
          >
            {/*  <MaterialIcons name="cancel" size={wp(10)} color="black" /> */}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    const { addRequestFunction, state } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <PaymentMethodHeader
          selectedValue={this.state.selectedValue}
          onValueChange={(val) => {
            this.setState({ cardselected: false });
            this.setState({ selectedValue: val }),
              this.setState({ paymentMethod: val });
          }}
        />
        {this.state.selectedValue === "Select" && (
          <SelectedPaymentMethod
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
        {this.state.paymentMethod === "Cash" && (
          <CashSelectedText
            text={"You have chosen to pay cash, payment is due upon arrival."}
          />
        )}
        {this.state.paymentMethod === "Cash" && (
          <TripDetails
            selectedValue={this.state.selectedValue}
            clientFirstName={this.state.clientFirstName}
            clientLastName={this.state.clientLastName}
            clientCellNumber={this.state.clientCellNumber}
            departure={this.state.departure}
            timeRequested={this.state.timeRequested}
          />
        )}
        {this.state.selectedValue === "Card" &&
          this.state.cardselected === false &&
          this.YourBankCardsList()}
        {YOURCARDS.length === 0 &&
          this.state.paymentMethod === "Card" &&
          this.AddACard()}
        {this.state.paymentMethod === "Card" &&
          this.state.cardselected === true &&
          this.SelectedbankCardAndTripDetails()}
        {this.state.paymentMethod &&
          this.state.selectedValue !== "Select" &&
          this.PaymentButton(addRequestFunction)}
        {this.state.paymentMethod === "Card" &&
          this.state.cardselected === true &&
          this.CancelSelectedCard()}
        {this.AddTipModal()}
      </View>
    );
  }
}

export default function (props) {
  const FETCH = () => {
    const [addRequest] = useMutation(NEW_REQUEST);
    return addRequest;
  };
  const addRequestFunction = FETCH();

  return (
    <ContextConsumer>
      {(context) => {
        return (
          <TrippyPayment
            {...props}
            dispatch={context.dispatch}
            state={context.state}
            addRequestFunction={addRequestFunction}
          />
        );
      }}
    </ContextConsumer>
  );
}
