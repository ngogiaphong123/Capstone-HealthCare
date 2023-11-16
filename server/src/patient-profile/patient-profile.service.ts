import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { HealthRecordConditionDto } from './dto'
import { PatientProfileError } from '../common/errors'
import { HealthRecordConditionAddedByDoctorDto } from './dto/hrc-doctor'

@Injectable()
export class PatientProfileService {
    constructor(private prisma: PrismaService) {}

    async getHealthRecord(userId: string) {
        const healthRecord = await this.prisma.healthRecord.findUnique({
            where: {
                patientId: userId,
            },
            select: {
                gender: true,
                bloodType: true,
                height: true,
                birthDate: true,
                bmi: true,
                healthRecordConditions: {
                    select: {
                        severity: true,
                        note: true,
                        type: true,
                        conditionId: true,
                        condition: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        })
        return healthRecord
    }

    async addHealthRecord(dto: HealthRecordConditionDto, patientId: string) {
        const { conditionId, note, severity, type } = dto
        const condition = await this.prisma.condition.findUnique({
            where: { id: conditionId },
        })
        if (!condition) {
            throw new Error(PatientProfileError.CONDITION_NOT_FOUND)
        }
        await this.prisma.healthRecordCondition.create({
            data: {
                conditionId,
                userId: patientId,
                healthRecordId: patientId,
                note,
                severity,
                type,
            },
        })
    }

    async addHealthRecordByDoctor(
        dto: HealthRecordConditionAddedByDoctorDto,
        doctorId: string,
    ) {
        const { conditionId, note, severity, type, patientId } = dto
        const condition = await this.prisma.condition.findUnique({
            where: { id: conditionId },
        })
        if (!condition) {
            throw new Error(PatientProfileError.CONDITION_NOT_FOUND)
        }
        const hr = await this.prisma.healthRecord.findUnique({
            where: { patientId },
        })
        if (!hr) {
            throw new Error(PatientProfileError.HEALTH_RECORD_NOT_FOUND)
        }
        await this.prisma.healthRecordCondition.create({
            data: {
                conditionId,
                userId: doctorId,
                healthRecordId: patientId,
                note,
                severity,
                type,
            },
        })
    }
}
