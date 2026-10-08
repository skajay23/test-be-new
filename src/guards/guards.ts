// import jwtDecode from 'jwt-decode';
// import {
// 	CanActivate,
// 	ExecutionContext,
// 	Injectable,
// 	UnauthorizedException,
// 	ForbiddenException
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// import { PrismaService } from '@/prisma/prisma.service';
// import { UserProxy } from '@/shared/async-storage';

// @Injectable()
// export class BaseAccess extends AuthGuard('jwt') {}

// @Injectable()
// export class AuthAccess extends BaseAccess {
// 	constructor(
// 		public prisma: PrismaService,
// 		public userProxy: UserProxy
// 	) {
// 		super();
// 	}

// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		if (!(await super.canActivate(context)) as boolean) return false;
// 		const request = context.switchToHttp().getRequest();
// 		const token = request.headers.authorization.split(' ')[1];

// 		const { user } = jwtDecode(token as string) as any;
// 		const { id } = user;

// 		const latestUserData = await this.prisma.party.findUnique({
// 			where: { id },
// 			include: {
// 				groups: true,

// 				category: { select: { name: true, categoryManagerUsername: true } }
// 			}
// 		});


// 		if (!latestUserData) throw new ForbiddenException('User does not exist');

// 		Object.keys(latestUserData).forEach(key => {
// 			this.userProxy[key] = latestUserData[key];
// 		});

// 		return true;
// 	}
// }

// @Injectable()
// export class AdminAccess extends BaseAccess implements CanActivate {
// 	constructor(
// 		private prisma: PrismaService,
// 		private userProxy: UserProxy
// 	) {
// 		super();
// 	}

// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		if (!(await super.canActivate(context)) as boolean) return false;

// 		const request = context.switchToHttp().getRequest();
// 		const token = request.headers.authorization.split(' ')[1];

// 		const { user } = jwtDecode(token as string) as any;
// 		const { id } = user;

// 		const latestUserData = await this.prisma.party.findUnique({
// 			where: { id },
// 			include: { groups: true }
// 		});

// 		if (!latestUserData) throw new ForbiddenException('User does not exist');

// 		if (!latestUserData.isAdmin)
// 			throw new UnauthorizedException('You do not have root admin access');

// 		Object.keys(latestUserData).forEach(key => {
// 			this.userProxy[key] = latestUserData[key];
// 		});

// 		return true;
// 	}
// }

// @Injectable()
// export class ProductAdmin extends AuthAccess implements CanActivate {
// 	constructor(prisma: PrismaService, userProxy: UserProxy) {
// 		super(prisma, userProxy);
// 	}

// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		if (!(await super.canActivate(context)) as boolean) return false;

// 		const request = context.switchToHttp().getRequest();
// 		const token = request.headers.authorization.split(' ')[1];

// 		const { user } = jwtDecode(token as string) as any;
// 		const { id } = user;

// 		const latestUserData = await this.prisma.party.findUnique({
// 			where: { id },
// 			include: { groups: true }
// 		});

// 		if (!latestUserData) throw new ForbiddenException('User does not exist');

// 		const params = request.params;
// 		const mainRiskType = params.MainRiskType;
// 		const userGroups = latestUserData.groups;

// 		const hasPermission = userGroups.some(group => {
// 			const parsedPermissions = JSON.parse(group['permissions'] as string);
// 			return parsedPermissions.isAdmin && group.product == mainRiskType;
// 		});

// 		if (!hasPermission)
// 			throw new UnauthorizedException(`user not part of ${mainRiskType} admin group`);

// 		Object.keys(latestUserData).forEach(key => {
// 			this.userProxy[key] = latestUserData[key];
// 		});

// 		return true;
// 	}
// }

// @Injectable()
// export class ProductUser extends AuthAccess implements CanActivate {
// 	constructor(prisma: PrismaService, userProxy: UserProxy) {
// 		super(prisma, userProxy);
// 	}
// 	async canActivate(context: ExecutionContext): Promise<boolean> {
// 		if (!(await super.canActivate(context)) as boolean) return false;

// 		const request = context.switchToHttp().getRequest();
// 		const token = request.headers.authorization.split(' ')[1];

// 		const { user } = jwtDecode(token as string) as any;
// 		const { id } = user;

// 		const latestUserData = await this.prisma.party.findUnique({
// 			where: { id },
// 			include: { groups: true }
// 		});

// 		if (!latestUserData) throw new ForbiddenException('User does not exist');

// 		const params = request.params;
// 		const mainRiskType = params.MainRiskType;
// 		const userGroups = latestUserData.groups;

// 		const hasPermission = userGroups.some(group => {
// 			return group.product == mainRiskType;
// 		});

// 		if (!hasPermission)
// 			throw new UnauthorizedException(`user not part of ${mainRiskType} user group`);

// 		Object.keys(latestUserData).forEach(key => {
// 			this.userProxy[key] = latestUserData[key];
// 		});

// 		return true;
// 	}
// }
