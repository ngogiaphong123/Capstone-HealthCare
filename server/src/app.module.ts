import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { AuthModule } from './auth/auth.module'
import { AccountModule } from './account/account.module'
import { DoctorModule } from './doctor-profile/doctor-profile.module'
import { PatientProfileModule } from './patient-profile/patient-profile.module'
import { ConditionModule } from './condition/condition.module'
import { SpecialtyModule } from './specialty/specialty.module'
import { EducationModule } from './education/education.module'
@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        CloudinaryModule,
        AuthModule,
        AccountModule,
        DoctorModule,
        PatientProfileModule,
        ConditionModule,
        SpecialtyModule,
        EducationModule,
    ],
})
export class AppModule {}
