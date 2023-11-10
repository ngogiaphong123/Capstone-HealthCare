import { IsString, Length, Matches } from 'class-validator'

export class UserCore {
    // phone contain only digit, no space, no dash, no dot and no parentheses, space lead and have 10, 11 digits
    @IsString({ message: 'Phone number must be a string' })
    @Matches(/^0[0-9]{9,10}$/, { message: 'Phone number is invalid' })
    phone: string

    @IsString({ message: 'Password must be a string' })
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    password: string
}
