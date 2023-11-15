import { Controller, UseGuards, UseInterceptors } from '@nestjs/common'
import { ResTransformInterceptor } from '../common/interceptors'
import { JwtAuthGuard } from '../common/guards'
import { Roles } from '../common/decorators'
import { Role } from '@prisma/client'
import { DoctorService } from './doctor.service'

@Controller('doctor')
@UseInterceptors(ResTransformInterceptor)
@UseGuards(JwtAuthGuard)
@Roles(Role.DOCTOR)
export class DoctorController {
    constructor(private doctorService: DoctorService) {}
}
