import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ResTransformInterceptor } from '../common/interceptors'
import { JwtAuthGuard, RolesGuard } from '../common/guards'
import { GetCurrentUser, ResponseMessage, Roles } from '../common/decorators'
import { Role } from '@prisma/client'
import { DoctorProfileService } from './doctor-profile.service'
import { DoctorEducationDto, DoctorSpecialtyDto } from './dto'

@Controller('doctor-profile')
@UseInterceptors(ResTransformInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.DOCTOR)
export class DoctorProfileController {
    constructor(private doctorProfileService: DoctorProfileService) {}

    @Get('specialty')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Doctor specialties')
    async getSpecialties(@GetCurrentUser('id') userId: string) {
        return this.doctorProfileService.getSpecialties(userId)
    }

    @Post('specialty')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Specialty added successfully')
    async addSpecialty(
        @Body() dto: DoctorSpecialtyDto,
        @GetCurrentUser('id') userId: string,
    ) {
        return this.doctorProfileService.addSpecialty(dto, userId)
    }

    @Put('specialty')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Specialty updated successfully')
    async updateSpecialty(
        @Body() dto: DoctorSpecialtyDto,
        @GetCurrentUser('id') userId: string,
    ) {
        return this.doctorProfileService.updateSpecialty(dto, userId)
    }

    @Delete('specialty/:id')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Specialty deleted successfully')
    async deleteSpecialty(
        @GetCurrentUser('id') userId: string,
        @Param('id') id: string,
    ) {
        return this.doctorProfileService.deleteSpecialty(id, userId)
    }

    @Get('education')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Doctor education')
    async getEducation(@GetCurrentUser('id') userId: string) {
        return this.doctorProfileService.getEducation(userId)
    }

    @Post('education')
    async addEducation(
        @Body() dto: DoctorEducationDto,
        @GetCurrentUser('id') userId: string,
    ) {
        return this.doctorProfileService.addEducation(dto, userId)
    }

    @Put('education')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Education updated successfully')
    async updateEducation(
        @Body() dto: DoctorEducationDto,
        @GetCurrentUser('id') userId: string,
    ) {
        return this.doctorProfileService.updateEducation(dto, userId)
    }

    @Delete('education/:id')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Education deleted successfully')
    async deleteEducation(
        @GetCurrentUser('id') userId: string,
        @Param('id') id: string,
    ) {
        return this.doctorProfileService.deleteEducation(id, userId)
    }
}
