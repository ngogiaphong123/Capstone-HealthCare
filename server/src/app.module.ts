import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
@Module({
    imports: [ConfigModule.forRoot(), PrismaModule, CloudinaryModule],
})
export class AppModule {}
