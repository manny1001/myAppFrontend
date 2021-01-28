import { gql } from "@apollo/client";
export const PAYMENT_CONFIRMATION = gql`
  mutation PayOrConfirm(
    $uuidTrip: String
    $totalAmount: String
    $paymentMethod: String
  ) {
    TripCardPaymentCashConfirmation(
      uuidTrip: $uuidTrip
      totalAmount: $totalAmount
      paymentMethod: $paymentMethod
    )
  }
`;
export const NEW_REQUEST = gql`
  mutation NewRequest(
    $uuidUser: String
    $username: String
    $cellphone: String
    $location: String
    $destination: String
    $uuidDriver: String
  ) {
    newTripRequest(
      uuid: $uuidUser
      username: $username
      cellphone: $cellphone
      location: $location
      destination: $destination
      uuidDriver: $uuidDriver
    )
  }
`;
export const GET_PROFILE = gql`
  query getProfile {
    currentUser {
      uuid
      picture
      username
      email
      cellphone
      homeaddress
      workaddress
    }
  }
`;

export const GET_DRIVER_RESPONSE = gql`
  query GETDRIVERESPONSE($uuidUser: String!) {
    getDriverRequestResponse(uuidUser: $uuidUser) {
      id
      uuidTrip
      uuidUser
      username
      cellphone
      location
      destination
      totalAmount
      tip
      paymentmethod
      status
      rating
      uuidDriver
      drivername
      driversurname
      driverregistration
      model
      driverresponsetime
      driverarrivaltime
      drivercustomerarrivaltime
    }
  }
`;
