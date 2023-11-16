import { ConditionType, Severity } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class HealthRecordConditionDto {
    @IsNotEmpty({ message: 'Severity cannot be empty' })
    @IsEnum(Severity, {
        message: 'Severity must be LOW, MEDIUM or HIGH',
    })
    severity: string

    @IsNotEmpty({ message: 'Note cannot be empty' })
    @IsString({ message: 'Note must be a string' })
    note: string

    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsEnum(ConditionType, {
        message:
            'Type must be DISEASE, ALLERGY, SYMPTOM, PAST_SURGERY, FAMILY_HISTORY or OTHER',
    })
    type: string

    @IsNotEmpty({ message: 'Condition id cannot be empty' })
    @IsString({ message: 'Condition id must be a string' })
    conditionId: string
}
