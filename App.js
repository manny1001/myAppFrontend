import {
  AsyncStorage,
  Header,
  client,
  ApolloProvider,
  NavigationContainer,
  NetInfo,
  React,
  Suspense,
  Context,
  ContextConsumer,
  Loader,
  useFonts,
  styles,
  Profile,
  Home,
  More,
  AuthStack,
  TabIcon,
  Payments,
  linkingApp,
  Stack,
  AppStack,
  CHECK_FOR_ACTIVE_REQUEST,
  GET_USER_UUID,
  useQuery,
  navigationRef,
  routeNameRef,
  GetData,
  CheckDataConnectionModal,
} from "./src/api/constants";

const App = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [loaded] = useFonts({
    Gotham_Medium_Regular: require("./assets/fonts/Gotham_Medium_Regular.ttf"),
  });
  React.useEffect(() => {
    async function checkConnectivity() {
      await NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
      });
    }
    checkConnectivity();
  }, [isConnected]);

  if (!loaded) return <Loader />;
  if (isConnected === false)
    return (
      <Suspense fallback={Loader()}>
        <CheckDataConnectionModal isConnected={isConnected} />
      </Suspense>
    );

  return (
    <NavigationContainer
      ref={navigationRef}
      /* onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }} */
      onStateChange={() => {
        /* const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          console.log('currentRouteName',currentRouteName);
        }

        routeNameRef.current = currentRouteName; */
      }}
      linking={linkingApp}
    >
      <ApolloProvider client={client}>
        <Context>
          <ContextConsumer>
            {(context) => {
              return context.state.userToken === null ? (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Auth"
                    component={() => (
                      <Suspense fallback={Loader()}>
                        <AuthStack context={context} />
                      </Suspense>
                    )}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              ) : (
                <Suspense fallback={Loader()}>
                  <AppStack.Navigator
                    tabBarOptions={{
                      keyboardHidesTabBar: true,
                      style: styles.tabBarStyle,
                      activeBackgroundColor: "#4c09b7",

                      tabStyle: styles.tabStyle,
                      labelStyle: styles.tabBarLabelStyles,
                      showLabel: false,
                    }}
                    backBehavior="history"
                  >
                    <AppStack.Screen
                      name="Home"
                      component={(props) => <Home {...props} />}
                      options={{
                        tabBarIcon: () => <TabIcon name={"home"} />,
                      }}
                    />
                    <AppStack.Screen
                      name="Payments"
                      component={Payments}
                      options={{
                        tabBarIcon: () => <TabIcon name={"payment"} />,
                      }}
                    />
                    <AppStack.Screen
                      name="Profile"
                      component={Profile}
                      options={{
                        tabBarIcon: () => <TabIcon name={"person"} />,
                      }}
                    />
                    <AppStack.Screen
                      name="More"
                      component={More}
                      options={{
                        tabBarIcon: () => <TabIcon name={"more"} />,
                      }}
                    />
                  </AppStack.Navigator>
                </Suspense>
              );
            }}
          </ContextConsumer>
        </Context>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
