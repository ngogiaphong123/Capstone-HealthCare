import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
    DoctorEducationDto,
    DoctorSpecialtyDto,
    UpdateEducationDto,
} from './dto'
import { DoctorProfileError, errorHandler } from '../common/errors'

@Injectable()
export class DoctorProfileService {
    constructor(private prisma: PrismaService) {}

    async getSpecialties(userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { id: userId },
                include: {
                    doctorSpecialties: {
                        select: {
                            experience: true,
                            specialty: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            return doctor.doctorSpecialties
        } catch (error) {
            return errorHandler(error)
        }
    }

    async addSpecialty(dto: DoctorSpecialtyDto, userId: string) {
        try {
            const { specialtyId, experience } = dto
            const doctor = await this.prisma.doctor.findUnique({
                where: { id: userId },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            const specialty = await this.prisma.specialty.findUnique({
                where: { id: specialtyId },
            })
            if (!specialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            return this.prisma.doctorSpecialty.create({
                data: {
                    doctorId: doctor.id,
                    experience,
                    specialtyId,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async updateSpecialty(dto: DoctorSpecialtyDto, userId: string) {
        try {
            const { specialtyId, experience } = dto
            const doctor = await this.prisma.doctor.findUnique({
                where: { id: userId },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            const specialty = await this.prisma.specialty.findUnique({
                where: { id: specialtyId },
            })
            if (!specialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            const doctorSpecialty =
                await this.prisma.doctorSpecialty.findUnique({
                    where: {
                        doctorId_specialtyId: {
                            doctorId: doctor.id,
                            specialtyId: specialty.id,
                        },
                    },
                })
            if (!doctorSpecialty) {
                throw new Error(DoctorProfileError.DOCTOR_SPECIALTY_NOT_FOUND)
            }
            return this.prisma.doctorSpecialty.update({
                where: {
                    doctorId_specialtyId: {
                        doctorId: doctor.id,
                        specialtyId: specialty.id,
                    },
                },
                data: {
                    experience,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async deleteSpecialty(id: string, userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { id: userId },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            const specialty = await this.prisma.specialty.findUnique({
                where: { id },
            })
            if (!specialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            return this.prisma.doctorSpecialty.delete({
                where: {
                    doctorId_specialtyId: {
                        doctorId: doctor.id,
                        specialtyId: specialty.id,
                    },
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async getEducation(userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { id: userId },
                include: {
                    doctorEducations: {
                        select: {
                            degree: true,
                            year: true,
                            major: {
                                select: {
                                    name: true,
                                },
                            },
                            medicalSchool: {
                                select: {
                                    id: true,
                                    name: true,
                                    abbr: true,
                                },
                            },
                        },
                    },
                },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            return doctor.doctorEducations
        } catch (error) {
            return errorHandler(error)
        }
    }

    async addEducation(dto: DoctorEducationDto, userId: string) {
        try {
            const { medicalSchoolId, specialtyId, degree, year } = dto
            const medicalSchool = await this.prisma.medicalSchool.findUnique({
                where: { id: medicalSchoolId },
            })
            if (!medicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            const specialty = await this.prisma.specialty.findUnique({
                where: { id: specialtyId },
            })
            if (!specialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            const doctorEducation =
                await this.prisma.doctorEducation.findUnique({
                    where: {
                        doctorId_medicalSchoolId_degree_year_specialtyId: {
                            doctorId: userId,
                            medicalSchoolId,
                            degree,
                            year,
                            specialtyId,
                        },
                    },
                })
            if (doctorEducation) {
                throw new Error(
                    DoctorProfileError.DOCTOR_EDUCATION_ALREADY_EXISTS,
                )
            }
            return this.prisma.doctorEducation.create({
                data: {
                    doctorId: userId,
                    degree,
                    year,
                    medicalSchoolId,
                    specialtyId,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async updateEducation(dto: UpdateEducationDto, userId: string) {
        try {
            const {
                medicalSchoolId,
                specialtyId,
                degree,
                year,
                updatedMedicalSchoolId,
                updatedDegree,
                updatedYear,
                updatedSpecialtyId,
            } = dto
            const medicalSchool = await this.prisma.medicalSchool.findUnique({
                where: { id: medicalSchoolId },
            })
            if (!medicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            const updatedMedicalSchool =
                await this.prisma.medicalSchool.findUnique({
                    where: { id: updatedMedicalSchoolId },
                })
            if (!updatedMedicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            const specialty = await this.prisma.specialty.findUnique({
                where: { id: specialtyId },
            })
            if (!specialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            const updatedSpecialty = await this.prisma.specialty.findUnique({
                where: { id: updatedSpecialtyId },
            })
            if (!updatedSpecialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            const doctorEducation =
                await this.prisma.doctorEducation.findUnique({
                    where: {
                        doctorId_medicalSchoolId_degree_year_specialtyId: {
                            doctorId: userId,
                            medicalSchoolId,
                            specialtyId,
                            degree,
                            year,
                        },
                    },
                })
            if (!doctorEducation) {
                throw new Error(DoctorProfileError.DOCTOR_EDUCATION_NOT_FOUND)
            }
            return this.prisma.doctorEducation.update({
                where: {
                    doctorId_medicalSchoolId_degree_year_specialtyId: {
                        doctorId: userId,
                        medicalSchoolId,
                        degree,
                        year,
                        specialtyId,
                    },
                },
                data: {
                    degree: updatedDegree,
                    year: updatedYear,
                    medicalSchoolId: updatedMedicalSchoolId,
                    specialtyId: updatedSpecialtyId,
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }

    async deleteEducation(dto: DoctorEducationDto, userId: string) {
        try {
            const { medicalSchoolId, specialtyId, degree, year } = dto
            const medicalSchool = await this.prisma.medicalSchool.findUnique({
                where: { id: medicalSchoolId },
            })
            if (!medicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            const specialty = await this.prisma.specialty.findUnique({
                where: { id: specialtyId },
            })
            if (!specialty) {
                throw new Error(DoctorProfileError.SPECIALTY_NOT_FOUND)
            }
            return this.prisma.doctorEducation.delete({
                where: {
                    doctorId_medicalSchoolId_degree_year_specialtyId: {
                        doctorId: userId,
                        medicalSchoolId,
                        degree,
                        year,
                        specialtyId,
                    },
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }
}
