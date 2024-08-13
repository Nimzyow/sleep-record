import { gql } from "@apollo/client";

export const SUBMIT_FORM = gql`
  mutation RecordSleep(
    $name: String!
    $sleepDuration: Float
    $sleptAt: String!
    $gender: String!
  ) {
    recordSleep(
      name: $name
      sleepDuration: $sleepDuration
      sleptAt: $sleptAt
      gender: $gender
    ) {
      ... on User {
        id
        name
        gender
        sleeps {
          id
          sleepDuration
          sleptAt
        }
        _count {
          sleeps
        }
      }
      ... on UserInputError {
        message
        field
      }
    }
  }
`;
