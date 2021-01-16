import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export default class GoogleAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }
  updateText(text) {
    // Use updateText function from props.
    // Props are like state but not controlled by the component itself
    // The value is passed to the component from outside
    this.props.updateText(text);
  }
  render() {
    return (
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps={true}
        listViewDisplayed={false}
        styles={{ container: { width: wp(100), height: hp(20) } }}
        fetchDetails={true}
        placeholder="Search"
        onPress={(data) => {
        /*    this.setState({ desitination: data.description }); */
           this.props.updateText(text);
        }}
        query={{
          key: "AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM",
          language: "en",
        }}
        requestUrl={{
          useOnPlatform: "web",
          url:
            "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api", // or any proxy server that hits https://maps.googleapis.com/maps/api
        }}
        debounce={200}
        styles={{
          container: {
            width: wp(75),
            alignSelf: "center",
            marginLeft: wp(5),
          },
          textInputContainer: { width: wp(75) },
        }}
      />
    );
  }
}
