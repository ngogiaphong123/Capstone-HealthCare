import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto'
import * as argon2 from 'argon2'
import { Payload } from './types/payload'
import { AuthError, JwtError, errorHandler } from '../common/errors'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}
    async register(dto: RegisterDto) {
        try {
            const { phone, password, name } = dto
            const existedUser = await this.prisma.user.findUnique({
                where: { phone },
                select: {
                    id: true,
                    phone: true,
                    role: true,
                    avatar: true,
                    name: true,
                    address: true,
                    email: true,
                    password: true,
                },
            })
            if (existedUser) {
                throw new Error(AuthError.USER_PHONE_ALREADY_EXISTS)
            }
            const hashedPassword = await argon2.hash(password)
            const user = await this.prisma.user.create({
                data: {
                    phone,
                    name,
                    password: hashedPassword,
                    avatar: process.env.DEFAULT_AVATAR,
                },
            })
            const patient = await this.prisma.patient.create({
                data: {
                    id: user.id,
                },
            })
            await this.prisma.healthRecord.create({
                data: {
                    patientId: patient.id,
                },
            })
            const payload: Payload = {
                id: user.id,
            }
            const tokens = await this.generateTokens(payload)
            await this.updateTokens(user.id, tokens)
            const { password: _, ...rest } = user
            return {
                ...tokens,
                user: {
                    ...rest,
                },
            }
        } catch (error) {
            return errorHandler(error)
        }
    }

    async login(dto: LoginDto) {
        try {
            const { phone, password } = dto
            const user = await this.prisma.user.findUnique({
                where: { phone },
                select: {
                    id: true,
                    phone: true,
                    role: true,
                    avatar: true,
                    name: true,
                    address: true,
                    email: true,
                    password: true,
                },
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
            }
            const tokens = await this.generateTokens(payload)
            await this.updateTokens(user.id, tokens)
            const { password: _, ...rest } = user

            return {
                ...tokens,
                user: {
                    ...rest,
                },
            }
        } catch (error) {
            return errorHandler(error)
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
                name: true,
                address: true,
                email: true,
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
            }
            const newTokens = await this.generateTokens(newPayload)
            await this.updateTokens(user.id, newTokens)
            return newTokens
        } catch (error) {
            return errorHandler(error)
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
