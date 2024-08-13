import { mockDeep, DeepMockProxy } from "jest-mock-extended"
import { PrismaClient } from "@prisma/client"

const prisma = mockDeep<PrismaClient>()

export type MockPrismaClient = DeepMockProxy<PrismaClient>

export const mockPrisma: MockPrismaClient = prisma as unknown as MockPrismaClient

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}))

export default mockPrisma
