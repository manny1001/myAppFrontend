import React, { Component } from "react";
import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreData } from "./GFunctions";
const { Provider, Consumer } = React.createContext();
/* const NEW_REQUEST = gql`
  mutation($CustomerName: String) {
    newRequest(CustomerName: $CustomerName) {
      value
    }
  }
`; */

class Context extends Component {
  state = {
    sessionArray: {
      clientCellNumber: "",
      username: "",
      email: "",
      destination: "",
      departureTime: "",
      destinationArrivalTime: "",
      selectedDriver: {},
      location: "37 Launceston Rd, New Redruth, Alberton, 1449, South Africa",
      timeRequested: "",
      paymentMethod: "",
      tripFee: "",
      tip: "",
      firstTimeLogin: true,
      totalAmount: "",
      isloggedIn: false,
      userToken: null,
      AcceptedTCs: false,
      driveruuid: "",
      useruuid: "",
      activeRequest: false,
      driverArrived: false,
    },
  };

  dispatch = (action) => {
    switch (action.type) {
      case "SAVE_DRIVERARRIVED":
        console.log(action);
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              driverArrived: action.driverArrived,
            },
          }),
          () => StoreData("driverArrived", action.driverArrived)
        );
      case "SAVE_ACTIVEREQUEST":
        console.log(action);
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              activeRequest: action.activeRequest,
            },
          }),
          () => StoreData("activeRequest", action.activeRequest)
        );
      case "SAVE_USERUUID":
        console.log(action);
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              useruuid: action.useruuid,
            },
          }),
          () => StoreData("useruuid", action.useruuid)
        );
      case "SAVE_DRIVERUUID":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            driveruuid: action.driveruuid,
          },
        }));
      case "SAVE_TOTALAMOUNT":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              totalAmount: action.totalAmount,
            },
          }),
          () => StoreData("totalAmount", action.totalAmount)
        );
      case "SAVE_DRIVER":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              selectedDriver: action.selectedDriver,
            },
          }),
          () => StoreData("selectedDriver", action.selectedDriver)
        );
      case "AcceptedTCs":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            AcceptedTCs: true,
          },
        }));
      case "SET_FIRST_TIME":
        /*    console.log(action); */
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            firstTimeLogin: false,
          },
        }));
      case "SAVE_EMAIL":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            email: action.payload,
          },
        }));

      case "SAVE_CELL":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              clientCellNumber: action.clientCellNumber,
            },
          }),
          () => StoreData("clientCellNumber", action.clientCellNumber)
        );
      case "SAVE_PICKUPLOCATION":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              location: action.location,
            },
          }),
          () => StoreData("location", action.location)
        );
      case "SAVE_DESTINATION":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              destination: action.destination,
            },
          }),
          () => StoreData("destination", action.destination)
        );
      case "SIGN_IN":
        return this.setState(
          (state) => ({
            sessionArray: {
              ...this.state.sessionArray,
              isloggedIn: true,
              userToken: action.userToken,
            },
          }),
          () => StoreData("accessToken", action.userToken)
        );
      case "SIGN_OUT":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            isloggedIn: false,
            userToken: null,
          },
        }));
      case "RESTORE_TOKEN":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            isloggedIn: true,
            userToken: action.userToken,
          },
        }));
      case "ADD_TO_CART":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            timeRequested: new Date()
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, ""),
            paymentMethod: action.payload.paymentMethod,
            /*  cardName: action.payload.cardName,
            cardNumber: action.payload.cardNumber,
            cardDate: action.payload.cardDate, */
            tripFee: action.payload.tripFee,
            tip: action.payload.tip,
            totalAmount: action.payload.totalAmount,
          },
        }));
      default:
        return this.state;
    }
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state.sessionArray,
          dispatch: this.dispatch,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export { Context, Consumer as ContextConsumer };
