import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { exceptionHandler } from '../common/exception'

@Injectable()
export class EducationService {
    constructor(private prisma: PrismaService) {}

    async search(name: string) {
        try {
            return this.prisma.medicalSchool.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: name,
                            },
                        },
                        {
                            abbr: {
                                contains: name,
                            },
                        },
                    ],
                },
            })
        } catch (error) {
            return exceptionHandler(error)
        }
    }
}
