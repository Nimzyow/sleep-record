import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
    const users: { name: string; gender: "Male" | "Female" | "Other" }[] = [
        { name: "Carol Smith", gender: "Female" },
        { name: "John Doe", gender: "Male" },
    ]

    users.map(async (user) => {
        let date = new Date()
        let dateUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0)
        let dateTodayUTC = new Date(dateUTC)

        const generatedUser = await prisma.user.upsert({
            where: {
                name: user.name,
            },
            update: {},
            create: {
                name: user.name,
                gender: user.gender,
            },
        })
        for (let i = 1; i < 8; i++) {
            const pastDate = dateTodayUTC.setDate(dateTodayUTC.getDate() - 1)

            await prisma.sleep.create({
                data: {
                    userId: generatedUser.id,
                    sleepDuration: Math.round(Math.random() * (12 - 2) + 2),
                    sleptAt: new Date(pastDate).toISOString(),
                },
            })
        }
    })
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
