import React, { Component, lazy, Suspense } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLinkTo } from "@react-navigation/native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
const BigButton = lazy(() => import("../Components/Buttons"));
import Loader from "../navigation/Loader";
import { ContextConsumer } from "../Context";
import { PrevLocations } from "../DATA";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

class GoogleAutoComplete extends Component {
  static navigationOptions = {
    title: "Feed",
  };

  static path = "feed";
  constructor(props) {
    super(props);
    this.state = {
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
      tipAmount: 0.0,
      orderAmount: 200.6,
      totalAmount: 0,
      result: 0,
      selectedValue: "Select",
      paymentMethod: null,
      DestinationSelected: false,
      savedLocationVisible: PrevLocations.length === 0 ? false : false, //When deploying!!!!!..Change to ===>> {savedLocationVisible: PrevLocations.length === 0 ? false : true},
      checked: "first",
      value: null,
    };

    Geocoder.init("AIzaSyD7WWrmocEDp4T9JonO47DB1GSPllLJbsk");
  }

  getlocation = async () => {
    let status = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      this.setState({ errorMsg: "Permission to access location was denied" });
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    this.setState({ latitude: location.coords.latitude });
    this.setState({ longitude: location.coords.longitude });
    Geocoder.from(this.state.latitude, this.state.longitude)
      .then((json) => {
        var addressComponent = json.results[0];
        this.setState({ currentLocation: addressComponent.formatted_address });
        this.props.context.dispatch({
          type: "SAVE_PICKUPLOCATION",
          payload: this.state.currentLocation,
        });
      })
      .catch((error) => console.warn(error));
  };
  componentDidMount() {
    this.getlocation();
  }

  getTripInfo = async () => {
    try {
      let response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" +
          this.state.currentLocation +
          "&destination=" +
          this.state.desitination +
          "&key=AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM"
      );
      let json = await response.json();

      this.setState({ distance: json.routes[0].legs[0].distance.text });
      this.setState({ time: json.routes[0].legs[0].duration.text });
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              height: hp(15),
              alignSelf: "stretch",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              alignItems: "baseline",
            }}
          >
            <Text style={{ fontSize: RFPercentage(3) }}>Pickup</Text>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {/*  <MaterialIcons
                name="my-location"
                size={wp(9)}
                color="black"
                style={{ alignSelf: "center" }}
              /> */}
              {this.state.isClicked === false ? (
                this.state.currentLocation === "" ? (
                  <View
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ alignSelf: "center" }}>
                      Getting Location
                    </Text>
                    <ActivityIndicator
                      size="small"
                      style={{ alignSelf: "center" }}
                      color={"green"}
                    />
                  </View>
                ) : (
                  <Text
                    numberOfLines={3}
                    style={{
                      alignSelf: "center",

                      fontSize: RFValue(14),
                    }}
                  >
                    {this.state.currentLocation}
                  </Text>
                )
              ) : (
                <GooglePlacesAutocomplete
                  keyboardShouldPersistTaps={true}
                  listViewDisplayed={false}
                  fetchDetails={true}
                  placeholder="Enter location..."
                  onPress={(data) => {
                    this.setState({
                      currentLocation: data.description,
                    }),
                      this.setState({ isClicked: false }),
                      this.props.context.dispatch({
                        type: "SAVE_PICKUPLOCATION",
                        payload: data.description,
                      });
                  }}
                  query={{
                    key: "AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM",
                    language: "en",
                  }}
                  requestUrl={{
                    useOnPlatform: "web",
                    url:
                      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                  }}
                  debounce={200}
                  styles={{
                    container: {
                      width: wp(60),
                      alignSelf: "center",
                      marginLeft: wp(5),
                    },
                    textInputContainer: {
                      width: wp(60),
                      backgroundColor: "transparent",
                      borderColor: null,
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      height: hp(5),
                      color: "#5d5d5d",
                      fontSize: 16,
                    },
                  }}
                />
              )}

              {/* <TouchableOpacity
                onPress={() =>
                  this.setState({ isClicked: !this.state.isClicked })
                }
                style={{
                  justifyContent: "center",
                  width: wp(15),
                  height: hp(4),

                  alignSelf: "center",
                }}
              >
                {this.state.isClicked === false
                  ? {
                      <Feather
                    name="edit"
                    size={24}
                    color="black"
                    style={{ alignSelf: "center" }}
                  />
                    }
                  : {
                      <MaterialIcons
                    name="cancel"
                    size={24}
                    color="black"
                    style={{ alignSelf: "center" }}
                  />
                    }}
              </TouchableOpacity> */}
            </View>
          </View>
          {/*   <Entypo
            name="dots-three-vertical"
            size={wp(7)}
            color="black"
            style={{ marginLeft: wp(7) }}
          /> */}
          <View
            style={{
              height: hp(15),
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              alignSelf: "stretch",
            }}
          >
            <Text style={{ fontSize: RFPercentage(3) }}>Destination</Text>

            <View
              style={{
                height: hp(10),
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {/*  <MaterialIcons
                name="location-on"
                size={wp(10)}
                color="black"
                style={{ alignSelf: "center" }}
              /> */}
              {this.state.DestinationSelected === false ? (
                <>
                  <GooglePlacesAutocomplete
                    ref={(input) => (this.textInput = input)}
                    keyboardShouldPersistTaps={true}
                    listViewDisplayed={false}
                    fetchDetails={true}
                    placeholder="Enter destination..."
                    onPress={(data) => {
                      this.setState({ desitination: data.description }),
                        this.setState({ DestinationSelected: true }),
                        this.props.context.dispatch({
                          type: "SAVE_DESTINATION",
                          payload: this.state.desitination,
                        });
                    }}
                    query={{
                      key: "AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM",
                      language: "en",
                    }}
                    requestUrl={{
                      useOnPlatform: "web",
                      url:
                        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                    }}
                    debounce={200}
                    styles={{
                      container: {},
                      textInputContainer: {
                        backgroundColor: "transparent",
                        borderColor: null,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                      },
                      textInput: {
                        height: hp(5),
                        color: "#5d5d5d",
                        fontSize: 16,
                      },
                    }}
                  />

                  {PrevLocations.length !== 0 && (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ savedLocationVisible: true })
                      }
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        flexDirection: "row",
                        height: hp(5),
                        marginBottom: hp(3),
                        marginRight: wp(1),
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          color: "blue",
                          fontWeight: "bold",
                          fontSize: RFValue(12),
                        }}
                      >
                        Recent
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text
                  numberOfLines={3}
                  style={{
                    width: wp(55),
                    alignSelf: "center",

                    fontSize: RFValue(14),
                  }}
                >
                  {this.state.desitination}
                </Text>
              )}
              {this.state.DestinationSelected === true && (
                <TouchableOpacity
                  onPress={() => {
                    {
                      this.setState({ DestinationSelected: false }),
                        this.setState({ desitination: "" }),
                        this.setState({ value: null });
                    }
                  }}
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  {/* <FontAwesome
                    name="repeat"
                    size={wp(5.5)}
                    color="black"
                    style={{ alignSelf: "center" }}
                  /> */}
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <BigButton
              buttonStyle={{
                flex: 1,
                alignSelf: "center",
              }}
              onPress={() => {
                this.getTripInfo();
                this.props.navigation.navigate("ConfirmRide");
              }}
              title={"Request"}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>

          <Suspense fallback={<Loader />}>
            <Modal
              presentationStyle="formSheet"
              animationType="slide"
              /*     onBackdropPress={() => this.setState({ tipModalVisible: false })} */

              visible={this.state.savedLocationVisible}
            >
              <View
                style={{
                  backgroundColor: "#f5f5f5",
                  height: hp(100),
                  width: wp(100),
                  alignSelf: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    fontSize: RFValue(16),
                    marginLeft: wp(11),
                  }}
                >
                  Travelling to one of these destinations?
                </Text>
                <View
                  style={{
                    height: hp(40),
                    width: wp(80),
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      width: wp(80),
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    {PrevLocations.map((res) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              value: res.key,
                            });
                          }}
                          key={res.key}
                          style={{
                            marginBottom: 35,
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              height: 30,
                              width: 30,
                              borderRadius: 100,
                              borderWidth: 2,
                              borderColor: "#3740ff",
                              alignItems: "center",
                              justifyContent: "center",

                              flexDirection: "row",
                            }}
                          >
                            {this.state.value === res.key && (
                              <View
                                style={{
                                  width: 15,
                                  height: 15,
                                  borderRadius: 50,
                                  backgroundColor: "#3740ff",
                                }}
                              />
                            )}
                          </View>
                          <Text
                            style={{
                              marginRight: 35,
                              fontSize: 16,
                              color: "#000",
                              fontWeight: "400",

                              marginLeft: wp(3),
                            }}
                          >
                            {res.text}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ savedLocationVisible: false }),
                      this.setState({ desitination: "" }),
                      this.setState({ value: null });
                  }}
                  style={{ height: hp(5) }}
                >
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      fontSize: RFValue(19),
                      marginLeft: wp(11),
                      color: "red",
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
                <ContextConsumer>
                  {(context) => {
                    return (
                      <BigButton
                        disabled={this.state.value === null ? true : false}
                        onPress={() => {
                          this.setState({ desitination: this.state.value }),
                            this.setState({ DestinationSelected: true }),
                            this.setState({ savedLocationVisible: false }),
                            context.dispatch({
                              type: "SAVE_DESTINATION",
                              payload: this.state.value,
                            });
                        }}
                        title={"Use Address"}
                        buttonStyle={{
                          height: hp(10),
                          width: wp(80),
                          alignSelf: "center",
                        }}
                      />
                    );
                  }}
                </ContextConsumer>
              </View>
            </Modal>
          </Suspense>
        </View>
      </>
    );
  }
}

export default function (props) {
  const linkTo = useLinkTo();

  return (
    <>
      <ContextConsumer>
        {(context) => (
          <GoogleAutoComplete {...props} linkTo={linkTo} context={context} />
        )}
      </ContextConsumer>
    </>
  );
}
