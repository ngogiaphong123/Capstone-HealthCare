import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class DoctorSpecialtyDto {
    @IsNotEmpty({ message: 'Specialty id cannot be empty' })
    @IsString({ message: 'Specialty id must be a string' })
    specialtyId: string

    @IsNotEmpty({ message: 'Experience year cannot be empty' })
    @IsNumber({}, { message: 'Experience year must be a number' })
    experience: number
}
