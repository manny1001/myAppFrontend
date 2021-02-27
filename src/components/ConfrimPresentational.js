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
  GetData,
  styles,
  BigButton,
  Driver,
  NEW_PERSONAL_DRIVER,
  useMutation,
  AsyncStorage,
  MyPersonalDriver,
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
  urgency,
  personalDriver,
  setPersonalDriver,
}) => {
  const [newPersonalDriver, { called: CALLED }] = useMutation(
    NEW_PERSONAL_DRIVER
  );
  const [driverDistance, setDriverDistancce] = React.useState(500);
  const [clickedDriver, setClickedDriver] = React.useState(null);
  console.log(personalDriver === null);
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View
            style={[
              styles.container,
              {
                justifyContent: "space-between",
                flex: 1,
                alignSelf: "stretch",
              },
            ]}
          >
            <Text style={styles.heading2}>Departure</Text>
            <Text style={styles.locations}>{location}</Text>
            <Text style={styles.heading2}>Destination</Text>
            <Text style={styles.locations}>{destination}</Text>

            {personalDriver === null ||
              (driverDistance > 100 && (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: "Gotham_Medium_Regular",
                      }}
                    >
                      {clickedDriver === null ? `Available Drivers` : ""}
                    </Text>
                    {clickedDriver === null ? (
                      <Text
                        style={{
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
                            fontWeight: "bold",
                            fontFamily: "Gotham_Medium_Regular",
                          }}
                        >
                          Change
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Driver
                    context={context}
                    error={error}
                    data={DATA}
                    clickedDriver={clickedDriver}
                    setClickedDriver={(val) => setClickedDriver(val)}
                  />
                </>
              ))}
            {personalDriver !== null && driverDistance < 100 && (
              <>
                <View style={styles.personalDriverHeadingView}>
                  <Text style={styles.headingLeft}>Your personal Chauffer</Text>
                  <TouchableOpacity
                    onPress={() => {
                      StoreData("PersonalDriver", null);
                    }}
                    style={styles.headingRight}
                  >
                    Remove Chauffer
                  </TouchableOpacity>
                </View>
                <MyPersonalDriver />
              </>
            )}

            <ContextConsumer>
              {(context) => {
                return personalDriver === null ? (
                  <TouchableOpacity
                    onPress={() => {
                      /*  console.log(clickedDriver && clickedDriver.item.uuid); */
                      newPersonalDriver({
                        variables: {
                          driveruuid: clickedDriver && clickedDriver.item.uuid,
                          customerUUID: data && data.currentUser.uuid,
                        },
                      });
                      context.dispatch({
                        type: "SAVE_PERSONAL_DRIVER",
                        personalDriver:
                          clickedDriver && clickedDriver.item.uuid,
                      });
                    }}
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch",
                      justifyContent: "space-evenly",

                      borderWidth: 2,
                      backgroundColor: "black",
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        color: "white",
                        alignSelf: "stretch",
                        width: "90",
                      }}
                    >
                      Make personal Chauffer
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      flexDirection: "row",
                      alignSelf: "stretch",
                      justifyContent: "space-evenly",

                      borderWidth: 2,
                      backgroundColor: "black",
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        color: "white",
                        alignSelf: "stretch",
                        width: "90",
                      }}
                    >
                      "information goes here...."
                    </Text>
                  </TouchableOpacity>
                );
              }}
            </ContextConsumer>

            <BigButton
              disabled={
                clickedDriver === null || called === true || CALLED === true
                  ? true
                  : false
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
                      uuidDriver:
                        (clickedDriver && clickedDriver.item.uuid) ||
                        (personalDriver &&
                          driverDistance < 100 &&
                          personalDriver),
                      urgency: urgency,
                    },
                  }).then((DATA) => {
                    navigation.navigate("Payment"),
                      StoreData("uuidTrip", DATA.data.newTripRequest);
                  });
              }}
            />
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default ConfrimPresentational;
