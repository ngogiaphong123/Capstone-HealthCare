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
            const { secure_url, public_id } = await this.cloudinary.uploadFile(
                avatar,
            )
            await this.prisma.user.update({
                where: { id },
                data: {
                    avatar: secure_url,
                    avatarPublicId: public_id,
                },
            })
            return secure_url
        } catch (error) {
            console.log(error)
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
            })
            return user
        } catch (error) {
            return exceptionHandler(error)
        }
    }
}
