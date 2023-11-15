import { EditAccountDto } from './dto'
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ResTransformInterceptor } from '../common/interceptors'
import { JwtAuthGuard } from '../common/guards'
import { GetCurrentUser, ResponseMessage } from '../common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { AccountService } from './account.service'

@Controller('account')
@UseInterceptors(ResTransformInterceptor)
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('upload-avatar')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Upload avatar successfully')
    @UseInterceptors(FileInterceptor('avatar'))
    uploadAvatar(
        @UploadedFile() avatar: Express.Multer.File,
        @GetCurrentUser('id') id: string,
    ) {
        return this.accountService.uploadAvatar(avatar, id)
    }

    @Put('edit-profile')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('Edit profile successfully')
    editProfile(@Body() dto: EditAccountDto, @GetCurrentUser('id') id: string) {
        return this.accountService.editProfile(dto, id)
    }
}
