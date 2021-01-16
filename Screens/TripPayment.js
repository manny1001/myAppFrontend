//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import Header from "../Components/Header";
import { Picker } from "@react-native-community/picker";
import SelectBankCard, { DATA } from "../Components/selectBankCard";
import Icon from "react-native-vector-icons/AntDesign";
import { ContextConsumer } from "../Context";
import { ADDCARD } from "./AddBankCard";
import { Item } from "../Components/selectBankCard";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TextInput } from "react-native-paper";
import { NEW_REQUEST } from "../Queries";
import BigButton from "../Components/Buttons.js";

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
      location: [],
      errorMsg: null,
      latitude: null,
      longitude: null,
      currentLocation: "",
      isLoading: false,
      isClicked: false,
      distance: "",
      time: "",
      isVisible: true,
      tipModalVisible: false,
      paymentMethodSelected: false,
      tipAdded: false,
      tipAmount: 0,
      tripFee: 55.6,
      orderAmount: 200.6,
      totalAmount: 0,
      result: 0,
      selectedValue: "Select",
      paymentMethod: null,
      DestinationSelected: false,
      savedLocationVisible: false,
      checked: "first",
      value: null,
      methodSelected: true,
      cardName: "",
      cardNumber: "",
      months: "",
      year: "",
      cvv: "",
      doneEditing: "",
      setselectedCard: null,
      delivery: 22.0,
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
  /* */
  render() {
    const { addRequestFunction, state } = this.props;

    return (
      <>
        <View style={styles.mainView}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                marginLeft: wp(7),
                fontSize: RFValue(24),
                fontWeight: "600",
              }}
            >
              Method
            </Text>

            <Picker
              mode={"dropdown"}
              selectedValue={this.state.selectedValue}
              style={{
                height: hp(4),
                width: wp(20),
                borderRadius: wp(3),
                borderWidth: wp(0.3),
                justifyContent: "center",
                marginLeft: wp(5),
                marginTop: hp(0.5),
                backgroundColor: "#f5f5f5",
              }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ cardselected: false });
                this.setState({ selectedValue: itemValue }),
                  this.setState({ paymentMethod: itemValue });
              }}
            >
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Card" value="Card" />
            </Picker>
          </View>

          {this.state.selectedValue === "Select" && (
            <View
              style={{
                width: wp(85),
                height: hp(70),
                alignSelf: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    paymentMethod: "Card",
                    selectedValue: "Card",
                  })
                }
                style={{ alignSelf: "center", flexDirection: "column" }}
              >
                {/* <FontAwesome
                  name="credit-card-alt"
                  size={wp(15)}
                  color="black"
                /> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    paymentMethod: "Cash",
                    selectedValue: "Cash",
                  })
                }
                style={{ alignSelf: "center", flexDirection: "column" }}
              >
                {/*  <MaterialCommunityIcons
                  name="cash"
                  size={wp(27)}
                  color="black"
                /> */}
              </TouchableOpacity>
            </View>
          )}

          {this.state.paymentMethod === "Cash" && (
            <Text
              style={{
                width: wp(85),
                alignSelf: "center",
              }}
            >
              You have chosen to pay cash, payment is due upon arrival.
            </Text>
          )}
          {this.state.selectedValue === "Card" &&
            this.state.cardselected === false && (
              <SelectBankCard
                style={{
                  alignSelf: "center",
                  width: wp(90),
                  height: hp(38),
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
            )}

          {this.state.paymentMethod === "Cash" && (
            <View
              style={{
                height: hp(30),
                width: wp(85),
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: RFValue(24), fontWeight: "600" }}>
                Details
              </Text>
              <View
                style={{
                  width: wp(80),
                  height: hp(23),
                  alignSelf: "center",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.customerDetails}>
                  {this.state.clientFirstName} {this.state.clientLastName}
                </Text>
                <Text style={styles.customerDetails}>
                  {this.state.departure}
                </Text>
                <Text style={styles.customerDetails}>
                  {this.state.timeRequested}
                </Text>
                <Text style={styles.customerDetails}>
                  {this.state.clientCellNumber}
                </Text>
              </View>
            </View>
          )}
          {DATA.length === 0 && this.state.paymentMethod === "Card" && (
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
          )}
          {this.state.paymentMethod === "Card" &&
            this.state.cardselected !== false && (
              <View
                style={{
                  width: wp(90),
                  height: hp(37),
                  alignSelf: "center",
                }}
              >
                {this.state.setselectedCard !== null && (
                  <View
                    style={{
                      width: wp(70),
                      height: hp(37),
                      alignSelf: "center",
                      justifyContent: "space-evenly",
                    }}
                  >
                    {this.state.setselectedCard !== null && (
                      <Text
                        style={[
                          styles.cardDetails,
                          { fontWeight: "bold", alignSelf: "center" },
                        ]}
                      >
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
                )}
              </View>
            )}
          {this.state.selectedValue === "Select" && (
            <>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    paymentMethod: "Card",
                    selectedValue: "Card",
                  })
                }
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: hp(52),
                  left: wp(25),
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(18),
                    fontWeight: "500",
                  }}
                >
                  Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    paymentMethod: "Card",
                    selectedValue: "Card",
                  })
                }
                style={{
                  position: "absolute",
                  zIndex: 100,
                  top: hp(52),
                  right: wp(30),
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(18),
                    fontWeight: "500",
                  }}
                >
                  Cash
                </Text>
              </TouchableOpacity>
            </>
          )}

          {this.state.selectedValue !== "Select" && (
            <View
              style={{
                width: wp(85),
                alignSelf: "center",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {this.state.tipAmount === 0.0 ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ tipModalVisible: true });
                    this.setState({
                      totalAmount: this.state.tripFee + this.state.tipAmount,
                    });
                  }}
                  style={{
                    height: hp(5),
                    width: wp(30),
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    borderColor: "gray",
                    flexDirection: "row",
                    borderWidth: 0.3,
                    flexDirection: "row",
                  }}
                >
                  {/* 
                  <AntDesign
                    name="plus"
                    size={wp(4)}
                    color="black"
                    style={{ alignSelf: "center", marginLeft: wp(3) }}
                  /> */}
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: RFValue(13),
                      fontWeight: "500",
                      marginLeft: wp(3),
                    }}
                  >
                    Add tip
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ tipAmount: 0 });

                    this.setState({
                      totalAmount:
                        this.state.totalAmount - this.state.tipAmount,
                    });
                  }}
                  style={{
                    height: hp(5),
                    width: wp(30),
                    justifyContent: "flex-start",
                    alignSelf: "center",
                    borderColor: "gray",
                    flexDirection: "row",
                    borderWidth: 0.3,
                  }}
                >
                  {/* <AntDesign
                    name="minus"
                    size={wp(4)}
                    color="black"
                    style={{ alignSelf: "center", marginLeft: wp(3) }}
                  /> */}
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: RFValue(13),
                      fontWeight: "500",
                      marginLeft: wp(3),
                    }}
                  >
                    Remove tip
                  </Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  alignSelf: "center",
                  width: wp(90),
                }}
              >
                <View
                  style={{
                    height: hp(3),
                    width: wp(90),
                    alignSelf: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {this.props.route.params.from === "ride" ? (
                      <Text
                        style={{
                          alignSelf: "center",
                          marginLeft: wp(7),
                          fontSize: RFValue(14),
                          fontWeight: "500",
                        }}
                      >
                        Trip
                      </Text>
                    ) : (
                      <Text
                        style={{
                          alignSelf: "center",
                          marginLeft: wp(7),
                          fontSize: RFValue(14),
                          fontWeight: "500",
                        }}
                      >
                        Order
                      </Text>
                    )}

                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: RFValue(14),
                        marginRight: wp(6),
                        fontWeight: "500",
                      }}
                    >
                      R {this.state.tripFee.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: hp(3),
                    width: wp(90),
                    alignSelf: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        marginLeft: wp(7),
                        fontSize: RFValue(14),
                        fontWeight: "500",
                      }}
                    >
                      Tip
                    </Text>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: RFValue(14),
                        marginRight: wp(6),
                        fontWeight: "500",
                      }}
                    >
                      R {this.state.tipAmount.toFixed(2)}
                    </Text>
                  </View>
                </View>
                {/*  <View
                  style={{
                    flexDirection: "row",
                    width: wp(90),
                    height: hp(3),
                    justifyContent: "space-between",
                    alignSelf: "flex-end,",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      marginLeft: wp(7),
                      fontSize: RFValue(14),
                      fontWeight: "600",
                    }}
                  >
                    Delivery
                  </Text>

                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: RFValue(14),
                      marginRight: wp(6),
                      fontWeight: "500",
                    }}
                  >
                    R {this.state.delivery.toFixed(2)}
                  </Text>
                </View> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: wp(90),
                  height: hp(3),
                  justifyContent: "space-between",
                  alignSelf: "flex-end",
                }}
              >
                {/*  <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: wp(7),
                    fontSize: RFValue(18),
                    fontWeight: "600",
                  }}
                >
                  Total
                </Text>

                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: RFValue(14),
                    marginRight: wp(6),
                    fontWeight: "700",
                  }}
                >
                  R {this.state.totalAmount.toFixed(2)}
                </Text> */}
              </View>
            </View>
          )}
          {this.state.paymentMethod !== null &&
            this.state.selectedValue !== "Select" && (
              <View
                style={{
                  width: wp(90),
                  alignSelf: "center",
                }}
              >
                <BigButton
                  icon={<Icon name="Safety" size={24} color="black" />}
                  disabled={this.state.methodSelected === false ? true : false}
                  buttonStyle={{
                    height: hp(10),
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
                      : "Pay" +
                        " " +
                        "\n" +
                        "R" +
                        " " +
                        this.state.totalAmount.toFixed(2)
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
                        /* DriverName: "",
                        DriverSurname: "",
                        DriverRegistration: "",
                        DriverCarModel: "",
                        DriverResponseTime: "",
                        DriverArrivalTime: "",
                        DriverCustomerArrivalTime: "", */
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
                          /* cardName:
                            this.state.paymentMethod === "Card" &&
                            this.state.setselectedCard.cardName,
                          cardNumber:
                            this.state.paymentMethod === "Card" &&
                            this.state.setselectedCard.cardNumber,
                          cardDate:
                            this.state.paymentMethod === "Card" &&
                            this.state.setselectedCard.mm,
                          cardCVV:
                            this.state.paymentMethod === "Card" &&
                            this.state.setselectedCard.cvv, */
                        },
                      });
                  }}
                />
              </View>
            )}
        </View>
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
                    text !== "" &&
                      this.setState({ tipAmount: parseFloat(text) });
                  }
                }}
              />
            </View>
            <BigButton
              disabled={this.state.tipAmount === 0 ? true : false}
              onPress={() => {
                /*   this.setState({tipAmount:}) */
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

        {this.state.paymentMethod === "Card" &&
          this.state.cardselected === true && (
            <TouchableOpacity
              onPress={() => {
                this.setState({ cardselected: false }),
                  this.setState({ setselectedCard: null });
              }}
              style={{
                position: "absolute",
                top: hp(39),
                marginLeft: wp(8),
              }}
            >
              {/*   <MaterialIcons name="cancel" size={wp(10)} color="black" /> */}
            </TouchableOpacity>
          )}
      </>
    );
  }
}

export default function (props) {
  const FETCH = () => {
    const [addRequest, { data }] = useMutation(NEW_REQUEST);
    return addRequest;
    /* addRequest({
      variables: {
        CustomerName: "mannnnyyyy",
      },
    }); */
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

const styles = StyleSheet.create({
  mainView: { flex: 1, justifyContent: "space-evenly" },
});
