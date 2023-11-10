import { UserCore } from './user.core'
import { IsString, Length } from 'class-validator'

export class RegisterDto extends UserCore {
    @IsString({ message: 'Confirm password must be a string' })
    @Length(8, 20, {
        message: 'Confirm password must be between 8 and 20 characters',
    })
    confirmPassword: string
}
