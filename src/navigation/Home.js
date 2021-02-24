import {
  React,
  ContextConsumer,
  Stack,
  Ride,
  TrackDriver,
  Rating,
  Confirm,
  Payment,
  AddName,
} from "../api/constants";

const HomeStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ride"
        component={() => <Ride {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Confirm"
        component={(props) => <Confirm {...props} />}
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
            {(context) => <Payment context={context} props={props} />}
          </ContextConsumer>
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddName"
        component={AddName}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrackDriver"
        component={TrackDriver}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
