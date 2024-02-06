import {
  React,
  PhoneAuth,
  AuthStackNavigator,
  AcceptTandCs,
  Header,
} from "../api/constants";

const AuthenticationStack = ({ context }) => {
  return (
    <AuthStackNavigator.Navigator>
      {/* <AuthStackNavigator.Screen
        name="AcceptTandCs"
        component={(props) => <AcceptTandCs {...props} context={context} />}
        options={{ header: () => <Header /> }}
      /> */}
      <AuthStackNavigator.Screen
        name="PhoneAuth"
        component={(props) => <PhoneAuth {...props} context={context} />}
        options={{ header: () => <Header /> }}
      />
    </AuthStackNavigator.Navigator>
  );
};
export default AuthenticationStack;
