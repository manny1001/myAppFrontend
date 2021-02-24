import {
  React,
  PhoneAuth,
  AuthStackNavigator,
  AcceptTandCs,
  Suspense,
  Loader,
} from "../api/constants";

const AuthenticationStack = ({ context }) => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="AcceptTandCs"
        component={(props) => <AcceptTandCs {...props} context={context} />}
        options={{ headerShown: false }}
      />
      <AuthStackNavigator.Screen
        name="PhoneAuth"
        component={(props) => <PhoneAuth {...props} context={context} />}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};
export default AuthenticationStack;
