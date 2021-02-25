import { React, Settings, Feedback, About, Stack } from "../api/constants";

const SettingsStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={(props) => <Settings {...props} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default SettingsStack;
