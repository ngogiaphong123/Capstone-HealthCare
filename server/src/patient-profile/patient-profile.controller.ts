import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard, RolesGuard } from '../common/guards'
import { GetCurrentUser, ResponseMessage, Roles } from '../common/decorators'
import { PatientProfileService } from './patient-profile.service'
import { ResTransformInterceptor } from '../common/interceptors'
import { HRCDto, HRCIdDto, HRDto } from './dto'
import { UpdateHRCDto } from './dto/update-hrc.dto'

@Controller('patient-profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PATIENT')
@UseInterceptors(ResTransformInterceptor)
export class PatientProfileController {
    constructor(private patientProfileService: PatientProfileService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Get health record')
    async getHealthRecord(@GetCurrentUser('id') id: string) {
        return this.patientProfileService.getHealthRecord(id)
    }

    @Put('')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Update health record')
    async updateHealthRecord(
        @Body() dto: HRDto,
        @GetCurrentUser('id') id: string,
    ) {
        return this.patientProfileService.updateHealthRecord(dto, id)
    }

    @Post('add-condition')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Add new condition to health record')
    async addHealthRecordCondition(
        @Body() dto: HRCDto,
        @GetCurrentUser('id') id: string,
    ) {
        return this.patientProfileService.addCondition(dto, id)
    }

    @Post('update-condition')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Update condition in health record')
    async updateHealthRecordCondition(
        @Body() dto: UpdateHRCDto,
        @GetCurrentUser('id') id: string,
    ) {
        return this.patientProfileService.updateCondition(dto, id)
    }

    @Post('delete-condition')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Delete condition in health record')
    async deleteHealthRecordCondition(
        @Body() dto: HRCIdDto,
        @GetCurrentUser('id') id: string,
    ) {
        return this.patientProfileService.deleteCondition(dto, id)
    }

    @Roles('DOCTOR')
    @Post('doctor-add-condition')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Doctor add new condition to health record')
    async doctorAddHealthRecordCondition(
        @Body() dto: HRCDto,
        @GetCurrentUser('id') id: string,
    ) {
        return this.patientProfileService.addCondition(dto, dto.patientId, id)
    }

    @Roles('DOCTOR')
    @Post('doctor-update-condition')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Doctor update condition in health record')
    async doctorUpdateHealthRecordCondition(
        @Body() dto: UpdateHRCDto,
        @GetCurrentUser('id') id: string,
    ) {
        return this.patientProfileService.updateCondition(
            dto,
            dto.patientId,
            id,
        )
    }
}
