import { IsNotEmpty, IsString } from 'class-validator'
import { HealthRecordConditionDto } from './hrc.dto'

export class HealthRecordConditionAddedByDoctorDto extends HealthRecordConditionDto {
    @IsNotEmpty({ message: 'Patient id cannot be empty' })
    @IsString({ message: 'Patient id must be a string' })
    patientId: string
}
