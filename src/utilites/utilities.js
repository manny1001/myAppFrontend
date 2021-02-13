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
    Geocoder.from(latitude, longitude)
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
          currentLocation +
          "&destination=" +
          destination +
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
