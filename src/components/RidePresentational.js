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
}) => {
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <View style={styles.container}>
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
            <Urgency />

            <BigButton
              disabled={
                location === null || destination === null ? true : false
              }
              onPress={() => {
                navigation.navigate("Confirm");
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
