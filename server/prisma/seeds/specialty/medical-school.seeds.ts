import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// get all medical schools in Vietnam
const medicalSchools = [
    { name: 'Hanoi Medical University', abbreviation: 'HMU' },
    {
        name: 'Ho Chi Minh City University of Medicine and Pharmacy',
        abbreviation: 'HCMUMP',
    },
    {
        name: 'University of Medicine and Pharmacy at Ho Chi Minh City',
        abbreviation: 'UMP-HCM',
    },
    {
        name: 'Hue University of Medicine and Pharmacy',
        abbreviation: 'Hue UMP',
    },
    {
        name: 'Can Tho University of Medicine and Pharmacy',
        abbreviation: 'CTUMP',
    },
    {
        name: 'Da Nang University of Medical Technology and Pharmacy',
        abbreviation: 'DNUMTP',
    },
    { name: 'Pham Ngoc Thach University of Medicine', abbreviation: 'PNTUOM' },
    {
        name: 'Thai Nguyen University of Medicine and Pharmacy',
        abbreviation: 'TNUMP',
    },
    { name: 'Pharmacy University Hanoi', abbreviation: 'PUH' },
    { name: 'Pharmacy University Ho Chi Minh City', abbreviation: 'PUHCMC' },
    {
        name: 'Quy Nhon University of Medicine and Pharmacy',
        abbreviation: 'QNUMP',
    },
    { name: 'Vietnam Military Medical University', abbreviation: 'VMMU' },
    {
        name: 'University of Medicine and Pharmacy at Vinh City',
        abbreviation: 'UMP-Vinh',
    },
    {
        name: 'Bac Can University of Medicine and Pharmacy',
        abbreviation: 'BCUMP',
    },
    {
        name: 'Phu Tho University of Medicine and Pharmacy',
        abbreviation: 'PTUMP',
    },
    {
        name: 'Nghe An University of Medicine and Pharmacy',
        abbreviation: 'NAUMP',
    },
    {
        name: 'Quang Nam University of Medicine and Pharmacy',
        abbreviation: 'QNUMP',
    },
    {
        name: 'Dak Lak University of Medicine and Pharmacy',
        abbreviation: 'DLUMP',
    },
]
async function main() {
    await prisma.$connect()
    for (const medicalSchool of medicalSchools) {
        try {
            await prisma.medicalSchool.create({
                data: {
                    name: medicalSchool.name,
                    abbr: medicalSchool.abbreviation,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }
    await prisma.$disconnect()
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
