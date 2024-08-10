import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const resolvers = {
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
export default resolvers

interface RecordSleepInput {
  name: string
  sleepDuration: number
  sleptAt: string
  gender: string
}
