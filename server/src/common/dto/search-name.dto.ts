import { IsString } from 'class-validator'

export class SearchDto {
    @IsString({ message: 'Name must be a string' })
    name: string
}
