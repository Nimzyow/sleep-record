import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const typeDefs = `#graphql
  type Sleep {
    id: String
    sleepDuration: Float!
    sleptAt: String!
  }

  type User {
    id: String!
    name: String!
    gender: String!
    sleeps: [Sleep!]!
  }

  type Query {
    users: [User!]!
  }
`
const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany()
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })

console.log(`🚀 Server listening at: ${url}`)
