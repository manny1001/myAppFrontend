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
  driveruuid,
  loading,
  DATAS,
}) => {
  const [newPersonalDriver, { called: CALLED }] =
    useMutation(NEW_PERSONAL_DRIVER);
  const [driverDistance, setDriverDistancce] = React.useState(500);
  const [clickedDriver, setClickedDriver] = React.useState(null);
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
            <View
              style={{
                justifyContent: "space-between",
                flex: 1,
                alignSelf: "stretch",
                padding: wp(5),
              }}
            >
              <Text style={styles.heading1}>Departure</Text>
              <Text style={styles.locations}>{location}</Text>
              <Text style={styles.heading1}>Destination</Text>
              <Text style={styles.locations}>{destination}</Text>
              {personalDriver === null /* || */ && (
                /* driverDistance > 100 */ /* && */ <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.heading1}>
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
                        style={{
                          alignSelf: "flex-end",
                        }}
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
              )}
              {personalDriver !== null && (
                <>
                  <View style={styles.personalDriverHeadingView}>
                    <Text style={styles.headingLeft}>
                      Your personal Chauffer
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        StoreData("PersonalDriver", null);
                      }}
                      style={styles.headingRight}
                    >
                      Remove Chauffer
                    </TouchableOpacity>
                  </View>
                  <MyPersonalDriver loading={loading} DATAS={DATAS} />
                </>
              )}
              {personalDriver === null && clickedDriver !== null ? (
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
                      personalDriver: clickedDriver && clickedDriver.item.uuid,
                    });
                  }}
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    justifyContent: "space-evenly",
                    width: wp(70),
                    alignSelf: "center",
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
                    width: wp(70),
                    alignSelf: "center",
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
                    "something something"
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <BigButton
              disabled={
                clickedDriver === null && personalDriver === null ? true : false
              }
              title={"Next"}
              onPress={() => {
                newTripRequest({
                  variables: {
                    uuid: data && data.currentUser.uuid,
                    name: data && data.currentUser.name,
                    cellphone: data && data.currentUser.cellphone,
                    location:
                      "0A 2nd Road, Halfway House Estate, Midrand, 1685, South Africa",
                    destination: "Carlswald Midrand, South Africa",
                    uuidDriver: clickedDriver && clickedDriver.item.uuid,
                    urgency: urgency,
                  },
                }).then((DATA) => {
                  stopPolling(),
                    context.dispatch({
                      type: "SAVE_DRIVERUUID",
                      driveruuid: clickedDriver && clickedDriver.item.uuid,
                    });
                  context.dispatch({
                    type: "SAVE_ACTIVEREQUEST",
                    activeRequest: true,
                  }),
                    StoreData("uuidTrip", DATA.data.newTripRequest);
                });
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
