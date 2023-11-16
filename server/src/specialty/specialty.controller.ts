import { SpecialtyService } from './specialty.service'
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

@Controller('specialty')
@UseInterceptors(ResTransformInterceptor)
export class SpecialtyController {
    constructor(private specialtyService: SpecialtyService) {}

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Search for specialty by name')
    async search(@Body() dto: SearchDto) {
        return this.specialtyService.search(dto.name)
    }
}
