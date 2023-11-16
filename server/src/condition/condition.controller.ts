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
import { ConditionService } from './condition.service'
import { ResTransformInterceptor } from '../common/interceptors'

@Controller('condition')
@UseInterceptors(ResTransformInterceptor)
export class ConditionController {
    constructor(private conditionService: ConditionService) {}

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Search for condition by name')
    async search(@Body() dto: SearchDto) {
        return this.conditionService.search(dto.name)
    }
}
