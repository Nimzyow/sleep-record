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

  type Query {
    users: [User!]!
  }
  type Mutation {
    recordSleep(name: String!, sleepDuration: Float, sleptAt: String!, gender: String!): User!
  }
`

const getLast7Days = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
        const pastDate = new Date()
        pastDate.setDate(today.getDate() - i)
        dates.push(pastDate.toISOString().split("T")[0])
    }

    return dates.reverse()
}

const resolvers = {
    Query: {
        users: async () => {
            const users = await prisma.user.findMany({
                include: {
                    sleeps: true,
                    _count: true,
                },
            })
            return users
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
