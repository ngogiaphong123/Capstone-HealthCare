import { Module } from '@nestjs/common'
import { PatientProfileService } from './patient-profile.service'
import { PatientProfileController } from './patient-profile.controller'

@Module({
    providers: [PatientProfileService],
    controllers: [PatientProfileController],
})
export class PatientProfileModule {}
