import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PatientProfileService {
    constructor(private prisma: PrismaService) {}

    async searchCondition(condition: string) {
        const conditions = await this.prisma.condition.findMany({
            where: {
                name: {
                    contains: condition,
                },
            },
        })
        return conditions
    }

    async getHealthRecords(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                patient: {
                    select: {
                        healthRecords: {
                            select: {
                                birthDate: true,
                                bloodType: true,
                                height: true,
                                weight: true,
                                bmi: true,
                                healthRecordConditions: {
                                    select: {
                                        condition: true,
                                        type: true,
                                        note: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        return user.patient.healthRecords
    }
}
