import { gql } from "@apollo/client";

export const SUBMIT_FORM = gql`
  mutation RecordSleep(
    $name: String!
    $sleepDuration: Float!
    $sleptAt: String!
    $gender: String!
  ) {
    recordSleep(
      name: $name
      sleepDuration: $sleepDuration
      sleptAt: $sleptAt
      gender: $gender
    ) {
      gender
      id
      name
      sleeps {
        id
        sleepDuration
        sleptAt
      }
    }
  }
`;
