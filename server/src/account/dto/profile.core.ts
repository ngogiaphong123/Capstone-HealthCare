import { IsEmail, IsString, Length } from 'class-validator'

export class AccountCore {
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email is invalid' })
    @Length(1, 50, { message: 'Email must be between 1 and 50 characters' })
    email: string

    @IsString({ message: 'Full name must be a string' })
    @Length(1, 50, {
        message: 'Full name must be between 1 and 50 characters',
    })
    name: string

    @IsString({ message: 'Address must be a string' })
    @Length(1, 100, { message: 'Address must be between 1 and 100 characters' })
    address: string
}
