import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { DoctorEducationDto, DoctorSpecialtyDto } from './dto'
import { DoctorProfileError } from '../common/errors/doctor-profile'
import { exceptionHandler } from '../common/exception'
import { Degree } from '@prisma/client'

@Injectable()
export class DoctorProfileService {
    constructor(private prisma: PrismaService) {}

    async getSpecialties(userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
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
            return exceptionHandler(error)
        }
    }

    async searchSpecialties(name: string) {
        try {
            return this.prisma.specialty.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            })
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async addSpecialty(dto: DoctorSpecialtyDto, userId: string) {
        try {
            const { specialtyId, experience } = dto
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
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
            return exceptionHandler(error)
        }
    }

    async updateSpecialty(dto: DoctorSpecialtyDto, userId: string) {
        try {
            const { specialtyId, experience } = dto
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
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
            return exceptionHandler(error)
        }
    }

    async deleteSpecialty(id: string, userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
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
            return exceptionHandler(error)
        }
    }

    async getEducation(userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
                include: {
                    doctorEducations: {
                        select: {
                            degree: true,
                            year: true,
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
            return exceptionHandler(error)
        }
    }

    async searchMedicalSchools(name: string) {
        try {
            return this.prisma.medicalSchool.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: name,
                            },
                        },
                        {
                            abbr: {
                                contains: name,
                            },
                        },
                    ],
                },
            })
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async addEducation(dto: DoctorEducationDto, userId: string) {
        try {
            const { medicalSchoolId, degree, year } = dto
            if (Degree[degree] === undefined) {
                throw new Error(DoctorProfileError.INVALID_DEGREE)
            }
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            const medicalSchool = await this.prisma.medicalSchool.findUnique({
                where: { id: medicalSchoolId },
            })
            if (!medicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            return this.prisma.doctorEducation.create({
                data: {
                    doctorId: doctor.id,
                    degree,
                    year,
                    medicalSchoolId,
                },
            })
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async updateEducation(dto: DoctorEducationDto, userId: string) {
        try {
            const { medicalSchoolId, degree, year } = dto
            if (Degree[degree] === undefined) {
                throw new Error(DoctorProfileError.INVALID_DEGREE)
            }
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            const medicalSchool = await this.prisma.medicalSchool.findUnique({
                where: { id: medicalSchoolId },
            })
            if (!medicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            const doctorEducation =
                await this.prisma.doctorEducation.findUnique({
                    where: {
                        doctorId_medicalSchoolId: {
                            doctorId: doctor.id,
                            medicalSchoolId: medicalSchool.id,
                        },
                    },
                })
            if (!doctorEducation) {
                throw new Error(DoctorProfileError.DOCTOR_EDUCATION_NOT_FOUND)
            }
            return this.prisma.doctorEducation.update({
                where: {
                    doctorId_medicalSchoolId: {
                        doctorId: doctor.id,
                        medicalSchoolId: medicalSchool.id,
                    },
                },
                data: {
                    degree,
                    year,
                },
            })
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async deleteEducation(id: string, userId: string) {
        try {
            const doctor = await this.prisma.doctor.findUnique({
                where: { userId },
            })
            if (!doctor) {
                throw new Error(DoctorProfileError.DOCTOR_NOT_FOUND)
            }
            const medicalSchool = await this.prisma.medicalSchool.findUnique({
                where: { id },
            })
            if (!medicalSchool) {
                throw new Error(DoctorProfileError.MEDICAL_SCHOOL_NOT_FOUND)
            }
            return this.prisma.doctorEducation.delete({
                where: {
                    doctorId_medicalSchoolId: {
                        doctorId: doctor.id,
                        medicalSchoolId: medicalSchool.id,
                    },
                },
            })
        } catch (error) {
            return exceptionHandler(error)
        }
    }
}
