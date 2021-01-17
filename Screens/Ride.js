import React, { Component, lazy } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { ContextConsumer } from "../Context";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
const BigButton = lazy(() => import("../Components/Buttons"));
const PickUpLocation = lazy(() => import("../Components/PickUpLocation"));
const Destination = lazy(() => import("../Components/Destination"));
const PreviousLocationModal = lazy(() =>
  import("../Components/PreviousLocationModal")
);
import { PrevLocations } from "../DATA";
class GoogleAutoComplete extends Component {
  static path = "feed";
  constructor(props) {
    super(props);
    this.state = {
      desitination: "",
      errorMsg: null,
      latitude: null,
      longitude: null,
      currentLocation: "",
      isClicked: false,
      distance: "",
      time: "",
      DestinationSelected: false,
      savedLocationVisible: false, //When !!!!!!!InProduction!!!!!..Change to ===>> {savedLocationVisible: PrevLocations.length === 0 ? false : true},
      value: null,
    };

    /*   Geocoder.init("AIzaSyD7WWrmocEDp4T9JonO47DB1GSPllLJbsk"); */
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
    /* Geocoder.from(this.state.latitude, this.state.longitude)
      .then((json) => {
        var addressComponent = json.results[0];
        this.setState({ currentLocation: addressComponent.formatted_address });
        this.props.context.dispatch({
          type: "SAVE_PICKUPLOCATION",
          payload: this.state.currentLocation,
        });
      })
      .catch((error) => console.warn(error)); */
  };
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
  componentDidMount() {
    this.getlocation();
  }
  setCurrentLocationHandler = (val) => {
    this.setState({
      currentLocation: val,
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
          }}
        >
          <PickUpLocation
            setisClicked={() => this.setState({ isClicked: false })}
            isClicked={this.state.isClicked}
            currentLocation={this.state.currentLocation}
            setCurrentLocation={() => this.setCurrentLocationHandler()}
            dispatchSaveLocation={(data) => {
              this.props.context.dispatch({
                type: "SAVE_PICKUPLOCATION",
                payload: data,
              });
            }}
          />
          <Destination
            desitination={this.state.desitination}
            setsavedLocationVisible={() =>
              this.setState({ savedLocationVisible: true })
            }
            DestinationSelected={this.state.DestinationSelected}
            setDestinationSelected={(val) =>
              this.setState({
                DestinationSelected: val,
              })
            }
            setDestination={(val) => this.setState({ desitination: val })}
            dispatchSaveDestination={(val) =>
              this.props.context.dispatch({
                type: "SAVE_DESTINATION",
                payload: val,
              })
            }
          />
          <BigButton
            onPress={() => {
              this.getTripInfo();
              this.props.navigation.navigate("Confirm");
            }}
            title={"Request"}
            titleStyle={{ fontWeight: "bold" }}
          />
          <ContextConsumer>
            {(context) => {
              return (
                <PreviousLocationModal
                  visible={this.state.savedLocationVisible}
                  onPress={(res) => {
                    this.setState({
                      value: res.key,
                    });
                  }}
                  onPress2={() => {
                    this.setState({ savedLocationVisible: false }),
                      this.setState({ desitination: "" }),
                      this.setState({ value: null });
                  }}
                  onPress3={() => {
                    this.setState({ desitination: this.state.value }),
                      this.setState({ DestinationSelected: true }),
                      this.setState({ savedLocationVisible: false }),
                      context.dispatch({
                        type: "SAVE_DESTINATION",
                        payload: this.state.value,
                      });
                  }}
                  value={this.state.value}
                />
              );
            }}
          </ContextConsumer>
        </View>
      </View>
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
