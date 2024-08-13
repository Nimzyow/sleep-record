export default `#graphql
  type UserInputError {
    message: String!
    field: String!
  }

  type Sleep {
    id: String
    sleepDuration: Float!
    sleptAt: String!
  }

  type SleepCount {
    sleeps: Int!
  }

  type User {
    id: String!
    name: String!
    gender: String!
    sleeps: [Sleep!]!
    _count: SleepCount!
  }

  union RecordSleepResult = User | UserInputError

  type Query {
    users: [User!]
  }

  type Mutation {
    recordSleep(name: String!, sleepDuration: Float, sleptAt: String!, gender: String!): RecordSleepResult!
  }
`
