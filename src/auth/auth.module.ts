import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '@/prisma/prisma.module';
import { UserProxy } from '@/shared/async-storage';
import { AuthController } from './auth.controller';
import { LoginService } from './login/login.service';
import { ResetPasswordService } from './reset-password/reset-password.service';
import { JwtStrategy } from './login/strategy';

@Module({
	imports: [
		PrismaModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				secret: config.get<string>('JWT_SECRET'),
				signOptions: {
					expiresIn: config.get<string>('JWT_EXPIRES_IN') || '12h'
				}
			})
		})
	],
	controllers: [AuthController],
	providers: [
		LoginService,
		ResetPasswordService,
		JwtStrategy,
		UserProxy // ✅ যোগ করা হলো
	],
	exports: [
		LoginService,
		ResetPasswordService,
		UserProxy // ✅ অন্য module-এ inject করার জন্য export
	]
})
export class AuthModule {}
