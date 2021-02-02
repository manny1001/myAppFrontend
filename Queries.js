import { gql } from "@apollo/client";
export const USER_LOGIN = gql`
  mutation login($cellphone: String!, $type: String!) {
    login(cellphone: $cellphone, type: $type) {
      token
    }
  }
`;
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
export const GET_NEW_DRIVER = gql`
  mutation selectNewDriver($driveruuid: String, $useruuid: String) {
    selectNewDriver(driveruuid: $driveruuid, useruuid: $useruuid)
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

export const GET_USER_UUID = gql`
  query {
    currentUser {
      uuid
    }
  }
`;
export const GET_REQUEST_HISTORY = gql`
  query getRequestHistory($uuidUser: String!) {
    getRequestHistory(uuidUser: $uuidUser) {
      tip
      status
      uuidTrip
      createdAt
      uuidTrip
      updatedAt
      totalAmount
      location
      destination
    }
  }
`;

export const GET_DRIVER_RESPONSE = gql`
  query GETDRIVERESPONSE($uuidUser: String!, $status: String!) {
    getDriverRequestResponse(uuidUser: $uuidUser, status: $status) {
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
      driversLiveLocation
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
export const DRIVERS_LIVELOCATION = gql`
  query getDriversLocation($uuidDriver: String!) {
    getDriversLocation(uuidDriver: $uuidDriver) {
      username
      status
      driversLiveLocation
    }
  }
`;
