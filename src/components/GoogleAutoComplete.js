import { React, GooglePlacesAutocomplete, hp } from "../api/constants";

const GoogleAutoComplete = ({
  currentLocation,
  destination,
  getTripInfo,
  placeholder,
  setAddress,
  setSelected,
  dispatchAddress,
}) => {
  return (
    <GooglePlacesAutocomplete
      keyboardShouldPersistTaps={"always"}
      listViewDisplayed={false}
      fetchDetails={true}
      placeholder={placeholder}
      onPress={(data) => {
        setAddress(data.description),
          dispatchAddress(data.description),
          setSelected(true);

        {
          currentLocation === null || destination === null
            ? null
            : getTripInfo();
        }
      }}
      query={{
        key: "AIzaSyC5xUeX27_qX8nlwItKxi5IrMnP5R1j0jM",
        language: "en",
      }}
      requestUrl={{
        useOnPlatform: "web",
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
      }}
      debounce={200}
      styles={{
        container: { alignSelf: "stretch" },
        textInputContainer: {
          backgroundColor: "transparent",
          borderColor: null,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          alignSelf: "stretch",
        },
        textInput: {
          height: hp(5),
          color: "#5d5d5d",
          fontSize: 16,
          borderRadius: hp(5),
        },
      }}
    />
  );
};

export default GoogleAutoComplete;
