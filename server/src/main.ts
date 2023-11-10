import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.enableCors({})
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory(errors) {
                const error = errors
                    .map(error => {
                        return Object.values(error.constraints)
                    })
                    .join(', ')
                const message = `Validation failed`
                return new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message,
                        error,
                    },
                    HttpStatus.BAD_REQUEST,
                )
            },
        }),
    )
    await app.listen(process.env.API_PORT)
}
bootstrap()
