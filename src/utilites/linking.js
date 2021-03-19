import * as Linking from "expo-linking";

const prefix = Linking.makeUrl("/");

export const linkingApp = {
  prefixes: [prefix],
  config: {
    AppStack: {
      path: "AppStack",
      screens: {
        HomeStack: {
          path: "home",
          screens: {
            Ride: { path: "Ride" },
            Cart: { path: "Cart" },
            Checkout: { path: "Checkout" },
            ConfirmRide: { path: "ConfirmRide" },
            ProductItem: { path: "ProductItem" },
            TripPayment: { path: "TripPayment" },
            TrackDriver: { path: "scscsc" },
          },
        },
        Profile: { path: "Profile" },
        SettingsStack: {
          path: "Settings",
          screens: {
            Feedback: "Feedback",
            About: "About",
          },
        },
        PaymentsStack: { path: "payments", screens: { Orders: "Orders" } },
      },
    },
    Auth: {
      path: "Auth",
      Screens: {
        AcceptTandCs: "AcceptTandCs",
        PhoneAuth: "PhoneAuth",
      },
    },
  },
};
