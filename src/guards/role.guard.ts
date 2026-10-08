// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   ForbiddenException,
//   UnauthorizedException,
//   mixin,
//   Type,
// } from '@nestjs/common';
// import { PrismaService } from '@/prisma/prisma.service';
// import { UserProxy } from '@/shared/async-storage';
// import jwtDecode from 'jwt-decode';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class BaseAccess extends AuthGuard('jwt') {}

// /**
//  * Dynamic role-based guard.
//  * - Checks JWT validity (via BaseAccess)
//  * - Loads user with groups from Prisma
//  * - Matches roles like ["Admin"], ["Enterprise Admin"], etc.
//  */
// export const RolesGuard = (allowedRoles: string[]): Type<CanActivate> => {
//   @Injectable()
//   class RolesGuardMixin extends BaseAccess implements CanActivate {
//     constructor(private prisma: PrismaService, private userProxy: UserProxy) {
//       super();
//     }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//       // ✅ First check JWT authentication
//       if (!(await super.canActivate(context)) as boolean) return false;

//       const request = context.switchToHttp().getRequest();
//       const token = request.headers.authorization?.split(' ')[1];
//       if (!token) throw new UnauthorizedException('Missing Bearer token');

//       const decoded: any = jwtDecode(token);
//       const userId = decoded?.user?.id;
//       if (!userId) throw new UnauthorizedException('Invalid token payload');

//       // ✅ Fetch user with groups
//       const user = await this.prisma.party.findUnique({
//         where: { id: userId },
//         include: { groups: true },
//       });

//       if (!user) throw new ForbiddenException('User not found');

//       // ✅ Store fresh user in async storage for downstream use
//       Object.keys(user).forEach(key => (this.userProxy[key] = user[key]));

//       // ✅ Role logic
//       const userGroups = user.groups || [];
//       const userRoleNames = userGroups.map(g => g.name);

//       // Always grant access if user.isAdmin = true
//       if (user.isAdmin) {
//         console.log('[RolesGuard] Access granted: user is system admin');
//         return true;
//       }

//       const hasRole = allowedRoles.some(role =>
//         userRoleNames.some(userRole => userRole.toLowerCase() === role.toLowerCase()),
//       );

//       console.log('[RolesGuard] User roles:', userRoleNames);
//       console.log('[RolesGuard] Allowed roles:', allowedRoles);
//       console.log('[RolesGuard] Match found:', hasRole);

//       if (!hasRole) {
//         throw new ForbiddenException(
//           `Access denied. Required roles: ${allowedRoles.join(', ')}`,
//         );
//       }

//       return true;
//     }
//   }

//   return mixin(RolesGuardMixin);
// };
