import { gql } from "@apollo/client";

export const SUBMIT_FORM = gql`
  mutation SubmitForm(
    $name: String!
    $sleepDuration: Int!
    $sleptAt: String!
    $gender: String!
  ) {
    submitForm(
      name: $name
      sleepDuration: $sleepDuration
      sleptAt: $sleptAt
      gender: $gender
    ) {
      success
      message
    }
  }
`;
