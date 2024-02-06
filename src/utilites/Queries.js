import { gql } from "@apollo/client";

export const GET_USER_UUID = gql`
  query {
    currentUser {
      uuid
    }
  }
`;
export const CURRENT_DRIVER = gql`
  query driver($driveruuid: String!) {
    driver(driveruuid: $driveruuid) {
      name
      surname
      cellphone
      picture
      registration
      model
      status
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
export const NEW_PERSONAL_DRIVER = gql`
  mutation newPersonalDriver($driveruuid: String!, $customerUUID: String!) {
    newPersonalDriver(driveruuid: $driveruuid, customerUUID: $customerUUID)
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
    $urgency: String
  ) {
    newTripRequest(
      uuid: $uuid
      name: $name
      cellphone: $cellphone
      location: $location
      destination: $destination
      uuidDriver: $uuidDriver
      urgency: $urgency
    )
  }
`;
export const GET_NEW_DRIVER = gql`
  mutation selectNewDriver($driveruuid: String, $useruuid: String) {
    selectNewDriver(driveruuid: $driveruuid, useruuid: $useruuid)
  }
`;
export const CHECK_FOR_ACTIVE_REQUEST = gql`
  query GETDRIVERESPONSE($uuidUser: String!, $uuidTrip: String) {
    getDriverRequestResponse(uuidUser: $uuidUser, uuidTrip: $uuidTrip) {
      status
    }
  }
`;
export const GET_DRIVER_RESPONSE = gql`
  query GETDRIVERESPONSE($uuidUser: String!, $uuidTrip: String!) {
    getDriverRequestResponse(uuidUser: $uuidUser, uuidTrip: $uuidTrip) {
      id
        uuidTrip
        uuidUser
        name
        cellphone
        location
        destination
        totalAmount
        tip
        paymentmethod
        status
        rating
        uuidDriver
        driversCellphone
        driverImage
        driversLiveLocation
        drivername
        driversurname
        driverregistration
        model
        driverduration
        driverremainingtime
        drivercustomerarrivaltime
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
  query driversLocation($uuidUser: String, $uuidTrip: String) {
    driversLocation(uuidUser: $uuidUser, uuidTrip: $uuidTrip) {
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
      driversurname
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
      createdAt
      user {
        _id
        name
      }
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation postMessage($text: String!, $uuid: String, $uuidtrip: String!) {
    postMessage(text: $text, uuid: $uuid, uuidtrip: $uuidtrip)
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
export const GET_CARD_PAYMENT_RESULT = gql`
  query getCardPaymentResult(
    $uuidTrip: String!
    $totalAmount: String!
    $paymentMethod: String!
  ) {
    getCardPaymentResult(
      uuidTrip: $uuidTrip
      totalAmount: $totalAmount
      paymentMethod: $paymentMethod
    ) {
      uuidUser
      name
      totalAmount
      status
    }
  }
`;
export const ALERT_EMAIL = gql`
  mutation alertEmail($uuidTrip: String!, $message: String!, $status: String!) {
    alertEmail(uuidTrip: $uuidTrip, message: $message, status: $status)
  }
`;
export const CREATE_CHECKOUT = gql`
  mutation createCheckoutSession {
    createCheckoutSession {
      id
    }
  }
`;
