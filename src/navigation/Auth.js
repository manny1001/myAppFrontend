import React, { lazy } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const PhoneAuth = lazy(() => import("../screens/PhoneAuth"));
import { Context, ContextConsumer } from "../../src/context/Context";
const AcceptTandCs = lazy(() => import("../screens/TermsAndConditions"));
const AuthenticationStack = ({ setAppLoading }) => {
  const AuthStack = createStackNavigator();
  return (
    <ContextConsumer>
      {(context) => {
        return (
          <AuthStack.Navigator>
            <AuthStack.Screen
              name="AcceptTandCs"
              component={(props) => (
                <AcceptTandCs {...props} context={context} />
              )}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="PhoneAuth"
              component={(props) => (
                <PhoneAuth
                  {...props}
                  context={context}
                  setAppLOading={setAppLoading}
                />
              )}
              options={{ headerShown: false }}
            />
          </AuthStack.Navigator>
        );
      }}
    </ContextConsumer>
  );
};
export default AuthenticationStack;
