import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getUser = async (name: string) => {
  return await prisma.user.findFirst({
    where: {
      name,
    },
    include: {
      sleeps: true,
    },
  })
}

const createSleepRecord = async (userId: string, sleepDuration: number, sleptAt: string) => {
  await prisma.sleep.create({
    data: {
      userId,
      sleepDuration,
      sleptAt,
    },
  })
}

const resolvers = {
  Mutation: {
    recordSleep: async (_parent: unknown, args: RecordSleepInput) => {
      const { name, sleepDuration, sleptAt, gender } = args

      const user = await getUser(name)
      if (user) {
        await createSleepRecord(user.id, sleepDuration, sleptAt)
        return await getUser(name)
      }
      return prisma.$transaction(async (tx) => {
        const newUser = await prisma.user.create({
          data: {
            name,
            gender,
          },
        })
        await createSleepRecord(newUser.id, sleepDuration, sleptAt)
        return await getUser(newUser.name)
      })
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
