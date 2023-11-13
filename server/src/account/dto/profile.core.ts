import { IsEmail, IsString, Length } from 'class-validator'

export class ProfileCore {
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email is invalid' })
    @Length(1, 50, { message: 'Email must be between 1 and 50 characters' })
    email: string

    @IsString({ message: 'First name must be a string' })
    @Length(1, 50, {
        message: 'First name must be between 1 and 50 characters',
    })
    firstName: string

    @IsString({ message: 'Last name must be a string' })
    @Length(1, 50, { message: 'Last name must be between 1 and 50 characters' })
    lastName: string

    @IsString({ message: 'Address must be a string' })
    @Length(1, 100, { message: 'Address must be between 1 and 100 characters' })
    address: string
}
