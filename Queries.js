import { gql } from "@apollo/client";
export const NEW_REQUEST = gql`
  mutation(
    $CustomerName: String
    $CustomerSurname: String
    $CustomerCell: String
  ) {
    newRequest(
      CustomerName: $CustomerName
      CustomerSurname: $CustomerSurname
      CustomerCell: $CustomerCell
    )
  }
`;
