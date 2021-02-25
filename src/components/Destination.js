import {
  React,
  View,
  Text,
  TouchableOpacity,
  RFValue,
  RFPercentage,
  ContextConsumer,
  wp,
  hp,
  GoogleAutoComplete,
} from "../api/constants";

const Destination = ({
  getTripInfo,
  destination,
  setDestination,
  DestinationSelected,
  setDestinationSelected,
}) => {
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              alignSelf: "stretch",
            }}
          >
            <Text
              style={{
                fontFamily: "Gotham_Medium_Regular",
                fontSize: RFPercentage(3),
              }}
            >
              Destination
            </Text>

            <View
              style={{
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {DestinationSelected === false ? (
                <>
                  <GoogleAutoComplete
                    destination={destination}
                    placeholder={"where would you like to go?"}
                    setAddress={(val) => setDestination(val)}
                    dispatchAddress={(data) => {
                      context.dispatch({
                        type: "SAVE_DESTINATION",
                        destination: data,
                      });
                    }}
                    setSelected={setDestinationSelected}
                    getTripInfo={getTripInfo}
                  />
                </>
              ) : (
                <Text style={{ alignSelf: "center" }}>
                  {destination !== null
                    ? destination
                    : context.state.destination}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  {
                    setDestinationSelected(!DestinationSelected);
                  }
                }}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    padding: wp(2.5),
                    fontFamily: "Gotham_Medium_Regular",
                    textDecorationLine: "underline",
                  }}
                >
                  Switch
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default Destination;
