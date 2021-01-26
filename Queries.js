import gql from "graphql-tag";
export const NEW_REQUEST = gql`
  mutation {
    newTripRequest(
      username: String
      cellphone: String
      location: String
      destination: String
      paymentmethod: String
    )
  }
`;
export const GET_PROFILE = gql`
  query getProfile {
    currentUser {
      id
      username
      cellphone
      homeaddress
      workaddress
    }
  }
`;
