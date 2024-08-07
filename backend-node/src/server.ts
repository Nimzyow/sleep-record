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
    sleeps: [Sleep]!
  }

  type Query {
    users: [User!]!
  }
  type Mutation {
    recordSleep(name: String!, sleepDuration: Float, sleptAt: String!, gender: String!): User!
  }
`
const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany({
                include: {
                    sleeps: true,
                },
            })
        },
    },
    Mutation: {
        recordSleep: async (_parent: unknown, args: RecordSleepInput) => {
            const { name, sleepDuration, sleptAt, gender } = args
            const user = await prisma.user.findFirst({
                where: {
                    name,
                },
            })
            if (user) {
                await prisma.sleep.create({
                    data: {
                        userId: user.id,
                        sleepDuration,
                        sleptAt,
                    },
                })
                return await prisma.user.findFirst({
                    where: {
                        name,
                    },
                    include: {
                        sleeps: true,
                    },
                })
            }
            const newUser = await prisma.user.create({
                data: {
                    name,
                    gender,
                },
            })
            await prisma.sleep.create({
                data: {
                    userId: newUser.id,
                    sleepDuration,
                    sleptAt,
                },
            })
            return await prisma.user.findFirst({ where: { id: newUser.id }, include: { sleeps: true } })
        },
    },
}

interface RecordSleepInput {
    name: string
    sleepDuration: number
    sleptAt: string
    gender: string
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })

console.log(`🚀 Server listening at: ${url}`)
