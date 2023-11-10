import { HttpException, HttpStatus } from '@nestjs/common'
import { JwtError } from '../errors'

export const exceptionHandler = (error: Error) => {
    if (
        error.name === JwtError.JSON_WEB_TOKEN_ERROR ||
        error.name === JwtError.SYNTAX_ERROR
    ) {
        throw new HttpException(JwtError.INVALID_TOKEN, HttpStatus.BAD_REQUEST)
    } else if (error.name === JwtError.TOKEN_EXPIRED_ERROR) {
        throw new HttpException(JwtError.EXPIRED_TOKEN, HttpStatus.BAD_REQUEST)
    } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
}
