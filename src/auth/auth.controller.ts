import { Controller, Param, Post, Body, HttpCode, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { IServiceData } from '@/shared/interfaces';
import { LoginService } from './login/login.service';
import { LoginDto } from './login/dto';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { CreateResetPasswordDto } from './reset-password/dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly loginService: LoginService,
		private readonly resetPasswordService: ResetPasswordService
	) {}

	// ============================================
	// LOGIN
	// ============================================
	@ApiOperation({ summary: 'User login' })
	@HttpCode(200)
	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<IServiceData> {
		return await this.loginService.login(loginDto);
	}

	// ============================================
	// LOGOUT
	// ============================================
	@ApiOperation({ summary: 'User logout by email' })
	@HttpCode(200)
	@Get('logout/:email')
	async logout(@Param('email') email: string): Promise<IServiceData> {
		return await this.loginService.logOut(email);
	}

	// ============================================
	// RESET PASSWORD
	// ============================================
	@ApiOperation({ summary: 'Reset user password with email and new password' })
	@HttpCode(200)
	@Post('reset-password')
	async resetPassword(
		@Body() createResetPasswordDto: CreateResetPasswordDto
	): Promise<IServiceData> {
		return await this.resetPasswordService.resetPassword(createResetPasswordDto);
	}
}
