import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { errorHandler } from '../common/errors'

@Injectable()
export class ConditionService {
    constructor(private prisma: PrismaService) {}

    async search(condition: string) {
        try {
            const conditions = await this.prisma.condition.findMany({
                where: {
                    name: {
                        contains: condition,
                    },
                },
            })
            return conditions
        } catch (error) {
            return errorHandler(error)
        }
    }
}
