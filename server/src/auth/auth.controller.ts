import { AuthService } from './auth.service'
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto'
import { ResTransformInterceptor } from '../common/interceptors/response.interceptor'
import { ResponseMessage } from '../common/decorators/response.decorator'
import { JwtAuthGuard } from '../common/guards/index.guard'
import { GetCurrentUser } from '../common/decorators/get-user.decorator'
import { Payload } from './types/payload'

@Controller('auth')
@UseInterceptors(ResTransformInterceptor)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('User registered successfully')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ResponseMessage('User logged in successfully')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }

    @Get('/me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ResponseMessage('User profile')
    me(@GetCurrentUser() user: Payload) {
        return this.authService.getUser(user.id)
    }

    @Post('/refresh')
    @HttpCode(HttpStatus.CREATED)
    @ResponseMessage('Tokens refreshed successfully')
    refreshTokens(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshTokens(dto)
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ResponseMessage('User logged out successfully')
    logout(@GetCurrentUser() user: Payload) {
        return this.authService.logout(user.id)
    }
}
