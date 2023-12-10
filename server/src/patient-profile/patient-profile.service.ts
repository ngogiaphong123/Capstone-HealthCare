import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { HRCDto, HRCIdDto, HRDto, UpdateHRCDto } from './dto'
import { PatientProfileError, errorHandler } from '../common/errors'

@Injectable()
export class PatientProfileService {
    constructor(private prisma: PrismaService) {}

    async getHealthRecord(userId: string) {
        try {
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
        } catch (error) {
            return errorHandler(error)
        }
    }

    async updateHealthRecord(dto: HRDto, patientId: string) {
        try {
            return await this.prisma.healthRecord.update({
                where: {
                    patientId,
                },
                data: {
                    ...dto,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async addCondition(dto: HRCDto, patientId: string) {
        try {
            const { conditionId, note, severity, type } = dto
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
            return await this.prisma.healthRecordCondition.create({
                data: {
                    conditionId,
                    lastUpdatedById: patientId,
                    healthRecordId: patientId,
                    note,
                    severity,
                    type,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async updateCondition(dto: UpdateHRCDto, patientId: string) {
        try {
            const { conditionId, note, severity, type, updatedConditionId } =
                dto
            const healthRecordCondition =
                await this.prisma.healthRecordCondition.findUnique({
                    where: {
                        healthRecordId_conditionId: {
                            conditionId,
                            healthRecordId: patientId,
                        },
                    },
                })
            if (!healthRecordCondition) {
                throw new Error(
                    PatientProfileError.HEALTH_RECORD_CONDITION_NOT_FOUND,
                )
            }
            const condition = await this.prisma.condition.findUnique({
                where: { id: updatedConditionId },
            })
            if (!condition) {
                throw new Error(PatientProfileError.CONDITION_NOT_FOUND)
            }
            return await this.prisma.healthRecordCondition.update({
                where: {
                    healthRecordId_conditionId: {
                        conditionId,
                        healthRecordId: patientId,
                    },
                },
                data: {
                    conditionId: updatedConditionId,
                    note,
                    severity,
                    type,
                    lastUpdatedById: patientId,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async deleteCondition(dto: HRCIdDto, patientId: string) {
        try {
            const { conditionId } = dto
            const condition = await this.prisma.condition.findUnique({
                where: { id: conditionId },
            })
            if (!condition) {
                throw new Error(PatientProfileError.CONDITION_NOT_FOUND)
            }
            await this.prisma.healthRecordCondition.delete({
                where: {
                    healthRecordId_conditionId: {
                        conditionId,
                        healthRecordId: patientId,
                    },
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async doctorAddCondition(dto: HRCDto, doctorId: string) {
        try {
            const { patientId, conditionId, note, severity, type } = dto
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
            return await this.prisma.healthRecordCondition.create({
                data: {
                    conditionId,
                    lastUpdatedById: doctorId,
                    healthRecordId: patientId,
                    note,
                    severity,
                    type,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async doctorUpdateCondition(dto: UpdateHRCDto, doctorId: string) {
        try {
            const {
                patientId,
                conditionId,
                note,
                severity,
                type,
                updatedConditionId,
            } = dto
            const healthRecordCondition =
                await this.prisma.healthRecordCondition.findUnique({
                    where: {
                        healthRecordId_conditionId: {
                            conditionId,
                            healthRecordId: patientId,
                        },
                    },
                })
            if (!healthRecordCondition) {
                throw new Error(
                    PatientProfileError.HEALTH_RECORD_CONDITION_NOT_FOUND,
                )
            }
            const condition = await this.prisma.condition.findUnique({
                where: { id: updatedConditionId },
            })
            if (!condition) {
                throw new Error(PatientProfileError.CONDITION_NOT_FOUND)
            }
            return await this.prisma.healthRecordCondition.update({
                where: {
                    healthRecordId_conditionId: {
                        conditionId,
                        healthRecordId: patientId,
                    },
                },
                data: {
                    conditionId: updatedConditionId,
                    note,
                    severity,
                    type,
                    lastUpdatedById: doctorId,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }
}
