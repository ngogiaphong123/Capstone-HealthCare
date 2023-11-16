import { ConditionType, Severity } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class HRCDto {
    @IsNotEmpty({ message: 'Severity cannot be empty' })
    @IsEnum(Severity, {
        message: 'Severity must be LOW, MEDIUM or HIGH',
    })
    severity: Severity

    @IsNotEmpty({ message: 'Note cannot be empty' })
    @IsString({ message: 'Note must be a string' })
    note: string

    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsEnum(ConditionType, {
        message:
            'Type must be DISEASE, ALLERGY, SYMPTOM, PAST_SURGERY, FAMILY_HISTORY or OTHER',
    })
    type: ConditionType

    @IsNotEmpty({ message: 'Condition id cannot be empty' })
    @IsString({ message: 'Condition id must be a string' })
    conditionId: string

    @IsOptional()
    @IsNotEmpty({ message: 'Patient id cannot be empty' })
    @IsString({ message: 'Patient id must be a string' })
    patientId: string
}
