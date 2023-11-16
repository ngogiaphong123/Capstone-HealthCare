import { IsNotEmpty, IsString } from 'class-validator'
import { HRCDto } from './hrc.dto'

export class UpdateHRCDto extends HRCDto {
    @IsNotEmpty({ message: 'Condition id cannot be empty' })
    @IsString({ message: 'Condition id must be a string' })
    updatedConditionId: string
}
