import { Degree } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class DoctorEducationDto {
    @IsNotEmpty({ message: 'Medical school id cannot be empty' })
    @IsString({ message: 'Medical school id must be a string' })
    medicalSchoolId: string

    @IsNotEmpty({ message: 'Degree cannot be empty' })
    @IsEnum(Degree, {
        message:
            'Degree must be RESIDENT_TRAINING, SPECIALIZED_LEVEL_1, SPECIALIZED_LEVEL_2, MASTER or PHD',
    })
    degree: Degree

    @IsNotEmpty({ message: 'Graduation year cannot be empty' })
    @IsString({ message: 'Graduation year must be a string' })
    year: string
}
