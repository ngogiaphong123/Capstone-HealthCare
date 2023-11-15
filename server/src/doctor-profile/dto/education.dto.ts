import { Degree } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'

export class DoctorEducationDto {
    @IsNotEmpty({ message: 'Medical school id cannot be empty' })
    @IsString({ message: 'Medical school id must be a string' })
    medicalSchoolId: string

    @IsNotEmpty({ message: 'Degree cannot be empty' })
    @IsString({ message: 'Degree must be a string' })
    degree: Degree

    @IsNotEmpty({ message: 'Graduation year cannot be empty' })
    @IsString({ message: 'Graduation year must be a string' })
    year: string
}
