import React, { Component, lazy } from "react";
import { View, Text } from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { ContextConsumer } from "../Context";
import Geocoder from "react-native-geocoding";
import { StoreData } from "../GFunctions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
const BigButton = lazy(() => import("../Components/Buttons"));
const PickUpLocation = lazy(() => import("../Components/PickUpLocation"));
const Destination = lazy(() => import("../Components/Destination"));
const PreviousLocationModal = lazy(() =>
  import("../Components/PreviousLocationModal")
);
class GoogleAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation:
        "0A 2nd Road, Halfway House Estate, Midrand, 1685, South Africa",
      destination: "Carlswald Midrand, South Africa",
      errorMsg: null,
      latitude: null,
      longitude: null,
      locationSelected: false,
      distance: null,
      time: null,
      DestinationSelected: true,
      value: null,
      isClicked: false,
    };

    /* Geocoder.init("AIzaSyD7WWrmocEDp4T9JonO47DB1GSPllLJbsk"); */
  }

  /* getlocation = async () => {
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
          location: addressComponent.formatted_address,
        });
      })
      .catch((error) => console.warn(error));
  }; */

  /* getTripInfo = async () => {
    try {
      let response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" +
          this.state.currentLocation +
          "&destination=" +
          this.state.destination +
          "&key=AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM"
      );
      let json = await response.json();
      console.log(json, response, "here");
      this.setState({ distance: json.routes[0].legs[0].distance.text });
      this.setState({ time: json.routes[0].legs[0].duration.text });
      return json;
    } catch (error) {
      console.error(error);
    }
  }; */
  componentDidMount() {
    /*   this.getTripInfo(); */
    /*   this.getlocation(); */
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
            setIsClicked={() =>
              this.setState({ isClicked: !this.state.isClicked })
            }
            isClicked={this.state.isClicked}
            setLocationSelected={() =>
              this.setState({ locationSelected: true })
            }
            locationSelected={this.state.locationSelected}
            currentLocation={this.state.currentLocation}
            setCurrentLocation={() => this.setCurrentLocationHandler()}
            getTripInfo={() => this.getTripInfo()}
          />
          {this.state.location !== null && this.state.destination !== null && (
            <>
              <View
                style={{
                  justifyContent: "space-between",
                  width: wp(55),
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={{ alignSelf: "center" }}>{this.state.time}</Text>
                <Text style={{ alignSelf: "center" }}>
                  {this.state.distance}
                </Text>
              </View>
              <Text style={{ alignSelf: "center" }}>
                time and distance to destination
              </Text>
            </>
          )}

          <Destination
            setsavedLocationVisible={() =>
              this.setState({ savedLocationVisible: true })
            }
            DestinationSelected={this.state.DestinationSelected}
            setDestinationSelected={(val) =>
              this.setState({
                DestinationSelected: val,
              })
            }
            setDestination={(val) => this.setState({ destination: val })}
            dispatchSaveDestination={(val) =>
              this.props.context.dispatch({
                type: "SAVE_DESTINATION",
                payload: val,
              })
            }
            destination={this.state.destination}
            getTripInfo={() => this.getTripInfo()}
          />
          <BigButton
            disabled={
              this.state.location === null || this.state.destination === null
                ? true
                : false
            }
            onPress={() => {
              this.props.navigation.navigate("Confirm");
            }}
            title={"Request"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
      </View>
    );
  }
}

export default function (props) {
  React.useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <ContextConsumer>
        {(context) => <GoogleAutoComplete {...props} context={context} />}
      </ContextConsumer>
    </>
  );
}
