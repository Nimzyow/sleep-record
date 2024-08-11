import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        include: {
          sleeps: {
            orderBy: {
              sleptAt: "asc",
            },
            skip: 0,
            take: -7,
          },
          _count: {
            select: {
              sleeps: true, // Have to query count like this to get all entries of sleep, otherwise we'll always get 7.
            },
          },
        },
      })
    },
  },
}
export default resolvers
