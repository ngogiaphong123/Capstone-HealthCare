import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto'
import { exceptionHandler } from '../common/exception'
import * as argon2 from 'argon2'
import { Payload } from './types/payload'
import { AuthError, JwtError } from '../common/errors'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}
    async register(dto: RegisterDto) {
        try {
            const { phone, password } = dto
            const existedUser = await this.prisma.user.findUnique({
                where: { phone },
            })
            if (existedUser) {
                throw new Error(AuthError.USER_PHONE_ALREADY_EXISTS)
            }
            const hashedPassword = await argon2.hash(password)
            const user = await this.prisma.user.create({
                data: {
                    phone,
                    password: hashedPassword,
                    avatar: process.env.DEFAULT_AVATAR,
                },
            })
            const payload: Payload = {
                id: user.id,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar,
            }
            const tokens = await this.generateTokens(payload)
            await this.updateTokens(user.id, tokens)

            return {
                ...tokens,
                user: {
                    ...payload,
                },
            }
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async login(dto: LoginDto) {
        try {
            const { phone, password } = dto
            const user = await this.prisma.user.findUnique({
                where: { phone },
            })
            if (!user) {
                throw new Error(AuthError.USER_INVALID_CREDENTIALS)
            }
            const isPasswordValid = await this.verifyHash(
                user.password,
                password,
            )
            if (!isPasswordValid) {
                throw new Error(AuthError.USER_INVALID_CREDENTIALS)
            }
            const payload: Payload = {
                id: user.id,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar,
            }
            const tokens = await this.generateTokens(payload)
            await this.updateTokens(user.id, tokens)

            return {
                ...tokens,
                user: {
                    ...payload,
                },
            }
        } catch (error) {
            return exceptionHandler(error)
        }
    }
    async getUser(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                phone: true,
                role: true,
                avatar: true,
            },
        })
        return user
    }

    async refreshTokens(dto: RefreshTokenDto) {
        try {
            const { refreshToken } = dto
            const payload = await this.verifyToken(refreshToken)
            const user = await this.prisma.user.findUnique({
                where: { id: payload.id },
            })
            if (!user) {
                throw new Error(AuthError.USER_NOT_FOUND)
            }
            if (user.refreshToken !== refreshToken) {
                throw new Error(JwtError.INVALID_TOKEN)
            }
            const newPayload: Payload = {
                id: user.id,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar,
            }
            const newTokens = await this.generateTokens(newPayload)
            await this.updateTokens(user.id, newTokens)

            return {
                ...newTokens,
                user: {
                    ...newPayload,
                },
            }
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async verifyHash(hashedData: string, plainData: string) {
        return await argon2.verify(hashedData, plainData)
    }

    async generateTokens(payload: Payload) {
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: process.env.ACCESS_TOKEN_TTL,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.JWT_SECRET,
        })
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: process.env.REFRESH_TOKEN_TTL,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.JWT_SECRET,
        })

        return { accessToken, refreshToken }
    }

    async verifyToken(token: string) {
        return await this.jwt.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
            publicKey: process.env.PUBLIC_KEY,
        })
    }

    async updateTokens(
        id: string,
        {
            accessToken,
            refreshToken,
        }: {
            accessToken: string
            refreshToken: string
        },
    ) {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                accessToken,
                refreshToken,
            },
        })
    }

    async logout(id: string) {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                accessToken: null,
                refreshToken: null,
            },
        })
    }
}
