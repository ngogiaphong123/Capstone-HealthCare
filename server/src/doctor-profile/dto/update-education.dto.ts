import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { DoctorEducationDto } from './education.dto'
import { Degree } from '@prisma/client'

export class UpdateEducationDto extends DoctorEducationDto {
    @IsNotEmpty({ message: 'Updated medical school id cannot be empty' })
    @IsString({ message: 'Updated medical school id must be a string' })
    updatedMedicalSchoolId: string

    @IsNotEmpty({ message: 'Updated degree cannot be empty' })
    @IsEnum(Degree, {
        message:
            'Updated degree must be RESIDENT_TRAINING, SPECIALIZED_LEVEL_1, SPECIALIZED_LEVEL_2, MASTER or PHD',
    })
    updatedDegree: Degree

    @IsNotEmpty({ message: 'Updated graduation year cannot be empty' })
    @IsString({ message: 'Updated graduation year must be a string' })
    updatedYear: string
}
