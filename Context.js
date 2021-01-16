import React, { Component } from "react";
import { gql, useQuery } from "@apollo/client";
const NEW_REQUEST = gql`
  mutation($CustomerName: String) {
    newRequest(CustomerName: $CustomerName) {
      value
    }
  }
`;

const { Provider, Consumer } = React.createContext();

class Context extends Component {
  state = {
    sessionArray: {
      /*  cardName: "",
      cardNumber: "",
      cardDate: "",
      cardCVV: "", */
      clientCellNumber: "",
      clientFirstName: "",
      clientLastName: "",
      clientEmail: "",
      destination: "",
      departureTime: "",
      destinationArrivalTime: "",
      driverName: "",
      driverCellPhone: "",
      driverRegistration: "",
      driverImage: "",
      driverRegistration: "",
      departure: "",
      timeRequested: "",
      paymentMethod: "",
      tripFee: "",
      tip: "",
      firstTimeLogin: true,
      total: "",
      isloggedIn: false,
      userToken: null,
    },
  };

  dispatch = (action) => {
    switch (action.type) {
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
            clientEmail: action.payload,
          },
        }));
      case "SAVE_NAMES":
        /*        console.log(action); */
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            clientFirstName: action.payload.FirstName,
            clientLastName: action.payload.LastName,
          },
        }));
      case "SAVE_CELL":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            clientCellNumber: action.cell,
          },
        }));
      case "SAVE_PICKUPLOCATION":
        /*   console.log(action); */
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            departure: action.payload,
          },
        }));
      case "SAVE_DESTINATION":
        /*  console.log(action); */
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            destination: action.payload,
          },
        }));
      case "SIGN_IN":
        return this.setState((state) => ({
          sessionArray: {
            ...this.state.sessionArray,
            isloggedIn: true,
            userToken: action.userToken,
          },
        }));
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
            total: action.payload.total,
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
