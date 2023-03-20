import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDTO } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: AuthDTO) {
		return await this.authService.login(dto)
	}
	@Post('register')
	async register(@Body() dto: AuthDTO) {
		return await this.authService.register(dto)
	}
	@Post('tokens')
	async getNewTokens() {}
}
