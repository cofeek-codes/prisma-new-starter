import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
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

		const tokens = await this.getNewTokens(user.id)

		return { user, tokens }
	}
	async login(dto: AuthDTO) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email },
		})
		const isValidPassword = await verify(user.password, dto.password)

		if (!user)
			throw new BadRequestException('no user with this email registered')
		if (!isValidPassword) throw new UnauthorizedException('wrong password')

		const tokens = await this.getNewTokens(user.id)

		return { user, tokens }
	}
	private validateUser() {}
	private async getNewTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, { expiresIn: '1h' })
		const refreshToken = this.jwt.sign(data, { expiresIn: '7d' })
		return { accessToken, refreshToken }
	}
}
