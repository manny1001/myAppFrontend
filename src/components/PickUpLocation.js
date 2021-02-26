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
            }}
          >
            <Text>Pickup</Text>
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

              {/* {location === "" ? (
                <View
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                   <Text style={{fontFamily: "Gotham_Medium_Regular",
 alignSelf: "center" }}>Getting Location</Text>
                  <ActivityIndicator
                    size="small"
                    style={{ alignSelf: "center" }}
                    color={"green"}
                  />
                </View>
              ) : (
                <Text>{location}</Text>
              )} */}
              {/* {isClicked === false ? (
                <Text>{context.state.location}</Text>
              ) : (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  setSelected={(val) => {}}
                  setisClicked={setisClicked}
                  dispatchAddress={(data) => {
                    context.dispatch({
                      type: "SAVE_PICKUPLOCATION",
                      payload: data,
                    });
                  }}
                />
              )} */}

              {/* {isClicked === true ? (
                <GoogleAutoComplete
                  placeholder={"where should we find you?"}
                  setAddress={(val) => setCurrentLocation(val)}
                  setSelected={(val) => {}}
                  setisClicked={setisClicked}
                  dispatchAddress={(data) => {
                    context.dispatch({
                      type: "SAVE_PICKUPLOCATION",
                      payload: data,
                    });
                  }}
                />
              ) : context.state.location === "" ? (
                <View
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                   <Text style={{fontFamily: "Gotham_Medium_Regular",
 alignSelf: "center" }}>Getting Location</Text>
                  <ActivityIndicator
                    size="small"
                    style={{ alignSelf: "center" }}
                    color={"green"}
                  />
                </View>
              ) : (
                <Text
                  numberOfLines={3}
                  style={{
                    alignSelf: "center",

                    fontSize: RFValue(14),
                  }}
                >
                  {location !== null ? location : context.state.location}
                </Text>
              )} */}

              <TouchableOpacity onPress={() => setIsClicked()}>
                <Text
                  style={{
                    padding: wp(2.5),
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

export default PickUpLocation;
