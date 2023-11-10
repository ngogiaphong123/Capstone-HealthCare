import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { AuthModule } from './auth/auth.module'
@Module({
    imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        CloudinaryModule,
        AuthModule,
    ],
})
export class AppModule {}
