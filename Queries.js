import { gql } from "@apollo/client";

/* export const NEW_REQUEST = gql`
  mutation AddTodo($username: String
    $cellphone: String
    $location: String
    $destination: String
    $paymentmethod: String) {
    newTripRequest(
      username: $username
      cellphone: $cellphone
      location: $location
      destination: $destination
      paymentmethod: $paymentmethod
    ): String
  }
`; */

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
