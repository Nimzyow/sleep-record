import { PrismaClient, User, Prisma } from "@prisma/client"
import Joi from "joi"
import { isBefore } from "date-fns"

const prisma = new PrismaClient()

const recordSleepSchema = Joi.object({
  name: Joi.string().min(3).required(),
  sleepDuration: Joi.number().greater(0).required(), // Must be greater than 0
  sleptAt: Joi.string()
    .isoDate()
    .required()
    .custom((value, helpers) => {
      const sleptAtDate = new Date(value)
      const today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      if (!isBefore(sleptAtDate, today)) {
        return helpers.error("any.invalid", { message: '"sleptAt" must be a date before today.' })
      }
      return value
    }),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
})

const getUser = async (name: string) => {
  return await prisma.user.findFirst({
    where: {
      name,
    },
    include: {
      sleeps: true,
      _count: {
        select: {
          sleeps: true,
        },
      },
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
  RecordSleepResult: {
    __resolveType(obj: User | { field: string; message: string } | { message: string }) {
      if ("id" in obj) {
        return "User"
      }
      if ("field" in obj && "message" in obj) {
        return "UserInputError"
      }
      if ("message" in obj) {
        return "Error"
      }
      return null
    },
  },
  Mutation: {
    recordSleep: async (_parent: unknown, args: RecordSleepInput) => {
      const { name, sleepDuration, sleptAt, gender } = args

      const { error } = recordSleepSchema.validate({ name, sleepDuration, sleptAt, gender })

      if (error) {
        return {
          field: "VALIDATION_ERROR",
          message: `Validation error: ${error.details.map((detail) => detail.message).join(", ")}`,
        }
      }
      try {
        const user = await getUser(name)
        if (user) {
          await createSleepRecord(user.id, sleepDuration, sleptAt)
          return await getUser(name)
        }
        const newUser = await prisma.user.create({
          data: {
            name,
            gender,
          },
        })
        await createSleepRecord(newUser.id, sleepDuration, sleptAt)
        return await getUser(newUser.name)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P1001") {
            return {
              message: "Can't reach database server",
            }
          }
        }
        return {
          message: "An unknown error has occured",
        }
      }
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
