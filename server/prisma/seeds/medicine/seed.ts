import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse'
import { createReadStream } from 'fs'

const prisma = new PrismaClient()

async function main() {
    createReadStream('./prisma/seeds/medicine/medicine.csv')
        .pipe(parse({ delimiter: ',' }))
        .on(
            'data',
            async ([
                name,
                composition,
                uses,
                sideEffects,
                image,
                manufacturer,
            ]) => {
                await prisma.medicine.create({
                    data: {
                        name,
                        composition,
                        uses,
                        sideEffects,
                        image,
                        manufacturer,
                    },
                })
            },
        )
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
