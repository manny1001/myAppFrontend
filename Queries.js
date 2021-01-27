import { gql } from "@apollo/client";
export const NEW_REQUEST = gql`
  mutation NewRequest(
    $uuid: String
    $username: String
    $cellphone: String
    $location: String
    $destination: String
    $paymentmethod: String
  ) {
    newTripRequest(
      uuid: $uuid
      username: $username
      cellphone: $cellphone
      location: $location
      destination: $destination
      paymentmethod: $paymentmethod
    )
  }
`;
export const GET_PROFILE = gql`
  query getProfile {
    currentUser {
      uuid
      username
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
      total
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
