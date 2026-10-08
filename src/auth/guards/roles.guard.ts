// import {
// 	CanActivate,
// 	ExecutionContext,
// 	Injectable,
// 	ForbiddenException,
// 	UnauthorizedException
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from '@prisma/client';

// import { PrismaService } from '@/prisma/prisma.service';
// import { UserProxy } from '@/shared/async-storage';
// import { ROLES_KEY } from '../guards/decorators';

// @Injectable()
// export class RolesGuard implements CanActivate {
// 	constructor(
// 		private reflector: Reflector,
// 		private prisma: PrismaService,
// 		private userProxy: UserProxy
// 	) {}

// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		// 1️⃣ Route-এ @Roles() আছে কিনা চেক
// 		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
// 			context.getHandler(),
// 			context.getClass()
// 		]);

// 		// @Roles() না থাকলে সবাই access পাবে (JWT valid হলেই)
// 		if (!requiredRoles || requiredRoles.length === 0) {
// 			return true;
// 		}

// 		// 2️⃣ Request থেকে user নাও (JwtStrategy validate() থেকে আসে)
// 		const request = context.switchToHttp().getRequest();
// 		const jwtUser = request.user;

// 		if (!jwtUser?.id) {
// 			throw new UnauthorizedException('Login required');
// 		}

// 		// 3️⃣ DB থেকে fresh user data আনো
// 		const user = await this.prisma.user.findUnique({
// 			where: { id: jwtUser.id },
// 			select: {
// 				id: true,
// 				email: true,
// 				phone: true,
// 				name: true,
// 				role: true,
// 				isActive: true,
// 				lastLoginAt: true,
// 				createdAt: true,
// 				updatedAt: true
// 			}
// 		});

// 		if (!user) {
// 			throw new ForbiddenException('User not found');
// 		}

// 		if (!user.isActive) {
// 			throw new ForbiddenException('Account is deactivated');
// 		}

// 		// 4️⃣ UserProxy-তে fresh data সেভ (downstream ব্যবহারের জন্য)
// 		Object.keys(user).forEach(key => {
// 			(this.userProxy as any)[key] = (user as any)[key];
// 		});

// 		// 5️⃣ ADMIN সব কিছু করতে পারবে
// 		if (user.role === Role.ADMIN) {
// 			return true;
// 		}

// 		// 6️⃣ Role match check
// 		const hasRole = requiredRoles.includes(user.role);

// 		if (!hasRole) {
// 			throw new ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
// 		}

// 		return true;
// 	}
// }
