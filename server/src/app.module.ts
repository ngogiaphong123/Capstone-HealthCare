import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { AuthModule } from './auth/auth.module'
import { AccountModule } from './account/account.module'
import { DoctorModule } from './doctor-profile/doctor-profile.module'
import { PatientProfileModule } from './patient-profile/patient-profile.module';
@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        CloudinaryModule,
        AuthModule,
        AccountModule,
        DoctorModule,
        PatientProfileModule,
    ],
})
export class AppModule {}
