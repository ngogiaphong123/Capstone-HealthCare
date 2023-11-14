import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { exceptionHandler } from '../common/exception'
import { EditProfileDto } from './dto'

@Injectable()
export class AccountService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService,
    ) {}

    async uploadAvatar(avatar: Express.Multer.File, id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    avatar: true,
                    avatarPublicId: true,
                },
            })
            if (user.avatar !== process.env.DEFAULT_AVATAR) {
                await this.cloudinary.deleteFile(user.avatarPublicId)
            }
            if (avatar === undefined) {
                return await this.prisma.user.update({
                    where: { id },
                    data: {
                        avatar: process.env.DEFAULT_AVATAR,
                        avatarPublicId: null,
                    },
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
            }
            const { secure_url, public_id } = await this.cloudinary.uploadFile(
                avatar,
            )
            return await this.prisma.user.update({
                where: { id },
                data: {
                    avatar: secure_url,
                    avatarPublicId: public_id,
                },
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
        } catch (error) {
            return exceptionHandler(error)
        }
    }

    async editProfile(dto: EditProfileDto, id: string) {
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: {
                    ...dto,
                },
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
        } catch (error) {
            return exceptionHandler(error)
        }
    }
}
