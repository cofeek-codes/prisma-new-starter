import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDTO } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}
	async register(dto: AuthDTO) {
		const isAlreadyRegistered = await this.prisma.user.findUnique({
			where: { email: dto.email },
		})

		if (isAlreadyRegistered)
			throw new BadRequestException('user with this email is already in system')
		const user = await this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password),
			},
		})

		return user
	}
	async login(dto: AuthDTO) {}
	private validateUser() {}
	private async getNewTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, { expiresIn: '1h' })
		const refreshToken = this.jwt.sign(data, { expiresIn: '7d' })
		return { accessToken, refreshToken }
	}
}
