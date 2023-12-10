// phone          String  @unique
// password       String
// name           String
// avatar         String  @db.Text

import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()
const users = [
    {
        phone: '0798784338',
        password: '12345678',
        name: 'John 123',
        avatar: 'https://i.pravatar.cc/300',
    },
    {
        phone: '0798784330',
        password: '12345678',
        name: 'Jane 321',
        avatar: 'https://i.pravatar.cc/300',
    },
]

async function main() {
    await prisma.$connect()
    for (const user of users) {
        const hashedPassword = await argon2.hash(user.password)
        const t = await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
                role: 'DOCTOR',
            },
        })
        await prisma.doctor.create({
            data: {
                id: t.id,
            },
        })
    }
    await prisma.$disconnect()
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
