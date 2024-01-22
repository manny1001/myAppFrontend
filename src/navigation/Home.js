import {
  React,
  Text,
  useEffect,
  useState,
  useCallback,
  ContextConsumer,
  Stack,
  Ride,
  TrackDriver,
  Rating,
  Confirm,
  Payment,
  AddName,
  AsyncStorage,
} from "../api/constants";
import { useFocusEffect } from "@react-navigation/native";
const HomeStack = (props) => {
  const [activeRequest, setActiveRequest] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [currentLocation, setcurrentLocation] = React.useState(
    "0A 2nd Road, Halfway House Estate, Midrand, 1685, South Africa"
  );
  const [destination, setdestination] = React.useState(
    "Carlswald Midrand, South Africa"
  );
  React.useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("activeRequest").then((Active) =>
      setActiveRequest(false)
    );
    setLoading(false);
  }, []);
  /*   console.log(activeRequest); */
  if (loading === true) return <p></p>;
  if (loading === false)
    return (
      <Stack.Navigator
        /* initialRouteName={activeRequest === true ? "TrackDriver" : "Ride"} */
        initialRouteName={"Payment"}
      >
        <Stack.Screen
          name="Ride"
          component={(props) => (
            <Ride
              {...props}
              currentLocation={currentLocation}
              destination={destination}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={(props) => (
            <Confirm
              {...props}
              currentLocation={currentLocation}
              destination={destination}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rating"
          component={Rating}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Payment"
          component={(props) => (
            <ContextConsumer>
              {(context) => <Payment context={context} {...props} />}
            </ContextConsumer>
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddName"
          component={(props) => <AddName {...props} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackDriver"
          component={(props) => <TrackDriver {...props} />}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
};
export default HomeStack;
