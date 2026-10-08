import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateResetPasswordDto } from './dto';
import { IServiceData, ServiceError } from '@/shared/interfaces';

@Injectable()
export class ResetPasswordService {
	constructor(private prisma: PrismaService) {}

	// ============================================
	// RESET PASSWORD
	// ============================================
	async resetPassword(dto: CreateResetPasswordDto) {
		const { email, newPassword } = dto;

		// 1️⃣ User আছে কিনা চেক
		const userResp: IServiceData = await this.checkUserExists(email);
		if (!userResp.data) return userResp;

		// 2️⃣ Password আপডেট
		const updateResp: IServiceData = await this.updateUserPassword(email, newPassword);
		if (!updateResp.data) return updateResp;

		return {
			data: { message: 'Password reset successfully' }
		} as IServiceData;
	}

	// ============================================
	// USER EXISTS CHECK
	// ============================================
	async checkUserExists(email: string) {
		try {
			const userData = await this.prisma.user.findUnique({
				where: { email }
			});

			if (!userData) {
				return {
					businessError: {
						type: ServiceError.BAD_REQUEST,
						message: 'Invalid email'
					}
				} as IServiceData;
			}

			if (!userData.isActive) {
				return {
					businessError: {
						type: ServiceError.FORBIDDEN,
						message: 'Account is deactivated. Please contact admin.'
					}
				} as IServiceData;
			}

			return { data: userData } as IServiceData;
		} catch (e) {
			return { prismaError: e } as IServiceData;
		}
	}

	// ============================================
	// UPDATE PASSWORD
	// ============================================
	async updateUserPassword(email: string, newPassword: string) {
		try {
			await this.prisma.user.update({
				where: { email },
				data: {
					passwordHash: await argon2.hash(newPassword)
				}
			});

			return { data: { message: 'User password updated' } } as IServiceData;
		} catch (e) {
			return { prismaError: e } as IServiceData;
		}
	}
}
