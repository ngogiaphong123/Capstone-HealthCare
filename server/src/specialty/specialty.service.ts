import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { errorHandler } from '../common/errors'

@Injectable()
export class SpecialtyService {
    constructor(private prisma: PrismaService) {}

    async search(name: string) {
        try {
            return this.prisma.specialty.findMany({
                where: {
                    name: {
                        contains: name,
                    },
                },
            })
        } catch (error) {
            return errorHandler(error)
        }
    }
}
