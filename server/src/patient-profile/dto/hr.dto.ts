import { Gender } from '@prisma/client'
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator'

export class HRDto {
    @IsEnum(Gender, {
        message: 'Gender must be one of the following: MALE, FEMALE, OTHER',
    })
    @IsNotEmpty({
        message: 'Gender cannot be empty',
    })
    gender: Gender

    @IsString({
        message: 'Blood type must be a string',
    })
    @IsNotEmpty({
        message: 'Blood type cannot be empty',
    })
    bloodType: string

    @IsNumber(
        {},
        {
            message: 'Height must be a number',
        },
    )
    @IsNotEmpty({
        message: 'Height cannot be empty',
    })
    height: number

    @IsNumber(
        {},
        {
            message: 'Weight must be a number',
        },
    )
    @IsNotEmpty({
        message: 'Weight cannot be empty',
    })
    weight: number

    @IsDateString({}, { message: 'Birth date must be a date string' })
    @IsNotEmpty({
        message: 'Birth date cannot be empty',
    })
    birthDate: string

    @IsNumber(
        {},
        {
            message: 'BMI must be a number',
        },
    )
    @IsNotEmpty({
        message: 'BMI cannot be empty',
    })
    bmi: number
}
