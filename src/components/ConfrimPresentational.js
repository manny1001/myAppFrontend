import {
  React,
  Text,
  View,
  TouchableOpacity,
  wp,
  RFPercentage,
  ContextConsumer,
  RFValue,
  StoreData,
  styles,
  BigButton,
  Driver,
} from "../api/constants";

const ConfrimPresentational = ({
  destination,
  location,
  error,
  DATA,
  stopPolling,
  newTripRequest,
  data,
  navigation,
  called,
}) => {
  const [personalDriver, setPersonalDriver] = React.useState(null);
  const [clickedDriver, setClickedDriver] = React.useState(null);
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View
            style={[
              styles.container,
              { justifyContent: "space-between", flex: 1 },
            ]}
          >
            <Text style={styles.heading2}>Departure</Text>
            <Text style={styles.locations}>{location}</Text>
            <Text style={styles.heading2}>Destination</Text>
            <Text style={styles.locations}>{destination}</Text>

            {context.state.totalDriversOnline !== 0 && (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontWeight: "bold",
                    fontFamily: "Gotham_Medium_Regular",
                  }}
                >
                  {clickedDriver === null ? `Available Drivers` : ""}
                </Text>
                {clickedDriver === null ? (
                  <Text
                    style={{
                      fontSize: RFPercentage(2.5),
                      marginLeft: wp(5),
                      fontWeight: "bold",
                      fontFamily: "Gotham_Medium_Regular",
                    }}
                  >
                    {context.state.totalDriversOnline}
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setClickedDriver(null), setPersonalDriver(null);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(18),
                        fontWeight: "bold",
                        fontFamily: "Gotham_Medium_Regular",
                      }}
                    >
                      Change
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <Driver
              context={context}
              error={error}
              data={DATA}
              clickedDriver={clickedDriver}
              setClickedDriver={(val) => setClickedDriver(val)}
            />

            {clickedDriver !== null && personalDriver === null && (
              <TouchableOpacity
                onPress={() => setPersonalDriver("javssa")}
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-evenly",
                  margin: 5,
                  borderWidth: 2,
                  backgroundColor: personalDriver !== null && "black",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: personalDriver !== null && "white",
                    alignSelf: "stretch",
                    width: "90",
                  }}
                >
                  Make personal driver
                </Text>
              </TouchableOpacity>
            )}
            {clickedDriver !== null && personalDriver !== null && (
              <TouchableOpacity
                onPress={() => setPersonalDriver(null)}
                style={{
                  flexDirection: "row",
                  alignSelf: "stretch",
                  justifyContent: "space-evenly",
                  margin: 5,
                  borderWidth: 2,
                  backgroundColor: personalDriver !== null && "black",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    color: personalDriver !== null && "white",
                    alignSelf: "stretch",
                    width: "90",
                  }}
                >
                  Remove personal driver
                </Text>
              </TouchableOpacity>
            )}

            <BigButton
              disabled={
                clickedDriver === null || called === true ? true : false
              }
              title={"Next"}
              onPress={() => {
                context.dispatch({
                  type: "SAVE_DRIVERUUID",
                  driveruuid: clickedDriver && clickedDriver.item.uuid,
                }),
                  stopPolling(),
                  newTripRequest({
                    variables: {
                      uuid: data && data.currentUser.uuid,
                      name: data && data.currentUser.name,
                      cellphone: data && data.currentUser.cellphone,
                      location: location,
                      destination: destination,
                      uuidDriver: clickedDriver && clickedDriver.item.uuid,
                    },
                  }).then((data) =>
                    StoreData("uuidTrip", data.data.newTripRequest)
                  );
                navigation.navigate("Payment");
              }}
            />
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default ConfrimPresentational;
