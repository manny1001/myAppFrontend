import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text } from "react-native";

export default class GoogleAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }
  render() {
    return (
      <>
        <Text>{this.state.address}</Text>
      </>
    );
  }
}
