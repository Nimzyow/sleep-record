import { ApolloServer, gql } from "apollo-server"
import typeDefs from "../typeDefs/default"

describe("recordSleep mutation", () => {
  let server: ApolloServer

  beforeEach(() => {
    server = new ApolloServer({
      typeDefs,
    })
  })
})
