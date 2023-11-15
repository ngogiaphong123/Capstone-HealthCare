import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const specialties = [
    'Allergist',
    'Anesthesiologist',
    'Cardiologist',
    'Dermatologist',
    'Endocrinologist',
    'Gastroenterologist',
    'Hematologist',
    'Infectious Disease Specialist',
    'Internist',
    'Medical Geneticist',
    'Nephrologist',
    'Neurologist',
    'Obstetrician',
    'Gynecologist',
    'Oncologist',
    'Ophthalmologist',
    'Orthopedic Surgeon',
    'ENT Specialist',
    'Pediatrician',
    'Plastic Surgeon',
    'Psychiatrist',
    'Radiologist',
    'Rheumatologist',
    'Surgeon',
    'Urologist',
]

async function main() {
    await prisma.$connect()
    for (const specialty of specialties) {
        await prisma.specialty.create({
            data: {
                name: specialty,
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
