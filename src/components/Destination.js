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
  styles,
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
          <View style={styles.startRideMainSection}>
            <Text style={styles.heading1}>Destination</Text>

            <View
              style={{
                alignSelf: "stretch",
                flexDirection: "column",
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
                <Text>
                  {destination !== null
                    ? destination
                    : context.state.destination}
                </Text>
              )}
            </View>
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
              <Text style={styles.switchButton}>Switch</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default Destination;
