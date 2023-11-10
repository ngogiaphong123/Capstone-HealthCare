import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Prisma, PrismaClient } from '@prisma/client'
PrismaClient
@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
