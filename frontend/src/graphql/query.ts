import { gql } from "@apollo/client";

gql`
  query getAllUsersSleepRecords {
    users {
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
