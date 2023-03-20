import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: 'hard!to-guess_secret',
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		return this.prisma.user.findUnique({ where: { id: +id } })
	}
}
