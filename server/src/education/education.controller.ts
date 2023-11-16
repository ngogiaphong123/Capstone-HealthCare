import { EducationService } from './education.service'
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseInterceptors,
} from '@nestjs/common'
import { ResponseMessage } from '../common/decorators'
import { SearchDto } from '../common/dto'
import { ResTransformInterceptor } from '../common/interceptors'

@Controller('education')
@UseInterceptors(ResTransformInterceptor)
export class EducationController {
    constructor(private educationService: EducationService) {}

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Search for education by name')
    async search(@Body() dto: SearchDto) {
        return this.educationService.search(dto.name)
    }
}
