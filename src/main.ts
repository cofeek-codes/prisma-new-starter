import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import { ValidationPipe } from '@nestjs/common'
async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())

	const prisma = app.get(PrismaService)
	await prisma.enableShutdownHooks(app)

	await app.listen(3001)
}
bootstrap()
