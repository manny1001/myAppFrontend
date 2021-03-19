import {
  React,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RFPercentage,
  wp,
  hp,
  GoogleAutoComplete,
  ContextConsumer,
  styles,
} from "../api/constants";

const PickUpLocation = ({
  isClicked,
  setLocationSelected,
  currentLocation,
  setIsClicked,
  setCurrentLocation,
  getTripInfo,
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
              padding: wp(5),
            }}
          >
            <Text style={styles.heading1}>Pickup</Text>
            <View
              style={{
                alignSelf: "stretch",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {isClicked === false ? (
                currentLocation === "" || currentLocation === null ? (
                  <View
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Getting Location</Text>
                    <ActivityIndicator
                      size="small"
                      style={{ alignSelf: "center" }}
                      color={"green"}
                    />
                  </View>
                ) : (
                  <Text>{currentLocation}</Text>
                )
              ) : (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  dispatchAddress={(data) => {
                    context.dispatch({
                      type: "SAVE_PICKUPLOCATION",
                      payload: data,
                    });
                  }}
                  setSelected={setLocationSelected}
                  getTripInfo={getTripInfo}
                />
              )}
            </View>
            <TouchableOpacity onPress={() => setIsClicked()}>
              <Text style={styles.switchButton}>Switch</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </ContextConsumer>
  );
};

export default PickUpLocation;
