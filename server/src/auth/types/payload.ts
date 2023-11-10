import { Role } from '@prisma/client'

export type Payload = {
    id: string
    role: Role
    phone: string
    avatar: string
}
