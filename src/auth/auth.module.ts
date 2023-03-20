import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
	imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
