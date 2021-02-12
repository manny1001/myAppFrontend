import React, { lazy } from "react";
import { createStackNavigator } from "@react-navigation/stack";
const EnterOTP = lazy(() => import("../Screens/EnterOTP"));
const PhoneAuth = lazy(() => import("../Screens/PhoneAuth"));
import { ContextConsumer } from "../Context";
const AcceptTandCs = lazy(() => import("../Screens/AcceptTandCs"));
const AuthenticationStack = ({ setAppLoading }) => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="AcceptTandCs"
        component={(props) => <AcceptTandCs {...props} />}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="PhoneAuth"
        component={(props) => (
          <ContextConsumer>
            {(context) => {
              return (
                <PhoneAuth
                  {...props}
                  context={context}
                  setAppLOading={setAppLoading}
                />
              );
            }}
          </ContextConsumer>
        )}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="EnterOTP"
        component={(props) => <EnterOTP {...props} />}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
export default AuthenticationStack;
