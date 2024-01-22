import {
  React,
  View,
  ContextConsumer,
  PickUpLocation,
  Destination,
  BigButton,
  styles,
  TimeAndDistance,
  Urgency,
  StoreData,
  GetData,
  Header,

} from "../api/constants/";

const Confirmation = ({
  isClicked,
  setisClicked,
  locationSelected,
  setlocationSelected,
  currentLocation,
  setCurrentLocationHandler,
  getTripInfo,
  destination,
  time,
  distance,
  DestinationSelected,
  setDestinationSelected,
  setdestination,
  navigation,
  urgency,
  setUrgency,
}) => {
  /*  console.log(currentLocation);
  console.log(destination); */

  return (
    <ContextConsumer>
      {(context) => {
        GetData("activeRequest").then((data) => {});
        return (
          <View style={styles.container}>
            <Header />

            <PickUpLocation
              setIsClicked={() => setisClicked(!isClicked)}
              isClicked={isClicked}
              setLocationSelected={() => setlocationSelected(true)}
              locationSelected={locationSelected}
              currentLocation={currentLocation}
              setCurrentLocation={() => setCurrentLocationHandler()}
              getTripInfo={() => getTripInfo()}
            />
            {location !== null && destination !== null && (
              <TimeAndDistance time={time} distance={distance} />
            )}
            <Destination
              setsavedLocationVisible={() => setsavedLocationVisible(true)}
              DestinationSelected={DestinationSelected}
              setDestinationSelected={(val) => setDestinationSelected(val)}
              setDestination={(val) => setdestination(val)}
              dispatchSaveDestination={(val) =>
                context.dispatch({
                  type: "SAVE_DESTINATION",
                  payload: val,
                })
              }
              destination={destination}
              getTripInfo={() => getTripInfo()}
            />
            <Urgency setUrgency={setUrgency} />

            <BigButton
              disabled={
                location === null || destination === null ? true : false
              }
              onPress={() => {
                {
                  StoreData("Urgency", urgency), navigation.navigate("Confirm");
                }
              }}
              title={"Next"}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default Confirmation;
