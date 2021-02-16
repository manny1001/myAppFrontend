import { gql } from "@apollo/client";

export const GET_USER_UUID = gql`
  query {
    currentUser {
      _id
      uuid
    }
  }
`;
export const USER_LOGIN = gql`
  mutation login($cellphone: String!, $type: String!) {
    login(cellphone: $cellphone, type: $type) {
      token
    }
  }
`;
export const GET_PROFILE = gql`
  query getProfile {
    currentUser {
      _id
      uuid
      picture
      name
      email
      cellphone
      homeaddress
      workaddress
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $uuidUser: String!
    $name: String
    $email: String
    $cellphone: String
    $homeaddress: String
    $workaddress: String
  ) {
    updateProfile(
      uuidUser: $uuidUser
      name: $name
      email: $email
      cellphone: $cellphone
      homeaddress: $homeaddress
      workaddress: $workaddress
    )
  }
`;
export const UPDATE_USERNAME = gql`
  mutation updateUserName($uuidUser: String!, $name: String) {
    updateProfile(uuidUser: $uuidUser, name: $name)
  }
`;
export const GET_DRIVERS = gql`
  query {
    allDriver {
      _id
      uuid
      name
      surname
      status
      cellphone
      picture
      registration
      model
    }
  }
`;
export const NEW_REQUEST = gql`
  mutation NewRequest(
    $uuid: String
    $name: String
    $cellphone: String
    $location: String
    $destination: String
    $uuidDriver: String
  ) {
    newTripRequest(
      uuid: $uuid
      name: $name
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
export const GET_DRIVER_RESPONSE = gql`
  query GETDRIVERESPONSE($uuidUser: String!) {
    getDriverRequestResponse(uuidUser: $uuidUser) {
      id
      uuidTrip
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
export const DRIVERS_LIVELOCATION = gql`
  query getDriversLocation($uuidUser: String!, $uuidTrip: String!) {
    getDriversLocation(uuidUser: $uuidUser, uuidTrip: $uuidTrip) {
      uuidDriver
      uuidUser
      uuidTrip
      name
      cellphone
      status
      driversLiveLocation
      driverduration
      driverremainingtime
      drivername
      driverImage
      driversCellphone
      paymentmethod
      model
      driverregistration
      drivercustomerarrivaltime
    }
  }
`;
export const GET_MESSAGES = gql`
  query messages($uuidtrip: String!, $uuid: String!) {
    messages(uuidtrip: $uuidtrip, uuid: $uuid) {
      _id
      text
      user {
        _id
        name
      }
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation PostMessage($text: String!, $uuid: String, $uuidtrip: String!) {
    PostMessage(text: $text, uuid: $uuid, uuidtrip: $uuidtrip)
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

export const ALERT_EMAIL = gql`
  mutation alertEmail($uuidTrip: String!, $message: String!, $status: String!) {
    alertEmail(uuidTrip: $uuidTrip, message: $message, status: $status)
  }
`;
