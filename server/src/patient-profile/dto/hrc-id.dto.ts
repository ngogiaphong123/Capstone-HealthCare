import { IsNotEmpty, IsString } from 'class-validator'

export class HRCIdDto {
    @IsNotEmpty({ message: 'Condition id cannot be empty' })
    @IsString({ message: 'Condition id must be a string' })
    conditionId: string
}
