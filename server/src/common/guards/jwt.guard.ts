import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtError } from '../errors'
import { PrismaService } from '../../prisma/prisma.service'
import { Payload } from '../../auth/types/payload'
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwt: JwtService, private prisma: PrismaService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException()
        }
        try {
            const payload: Payload = await this.jwt.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
                publicKey: process.env.PUBLIC_KEY,
            })
            const user = await this.prisma.user.findUnique({
                where: { id: payload.id },
            })
            if (!user) {
                throw new UnauthorizedException(JwtError.INVALID_TOKEN)
            }
            request.user = payload
            return true
        } catch (error) {
            if (error.name === JwtError.TOKEN_EXPIRED_ERROR) {
                throw new UnauthorizedException(JwtError.ACCESS_TOKEN_EXPIRED)
            }
            if (
                error.name === JwtError.JSON_WEB_TOKEN_ERROR ||
                error.name === JwtError.SYNTAX_ERROR
            ) {
                throw new UnauthorizedException(JwtError.INVALID_TOKEN)
            }
            throw new UnauthorizedException(error.message)
        }
    }

    private extractTokenFromHeader(request: any): string | null {
        const {
            headers: { authorization },
        } = request
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization.split(' ')[1]
        }
        return null
    }
}
