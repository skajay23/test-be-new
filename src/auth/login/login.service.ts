import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

import { LoginDto } from "./dto";
import { PrismaService } from "@/prisma/prisma.service";
import { IServiceData, ServiceError } from "@/shared/interfaces";

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ✅ Matches the current User model
  userSelectOptions = {
    id: true,
    email: true,
    name: true,
    role: true,
    isActive: true,
    createdAt: true,
    passwordHash: true,
  };

  // ============================================
  // LOGIN
  // ============================================
  async login(loginDto: LoginDto): Promise<IServiceData> {
    try {
      // 1️⃣ Find user by email
      const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
        select: { ...this.userSelectOptions },
      });

      if (!user) {
        return {
          businessError: {
            type: ServiceError.FORBIDDEN,
            message: "Invalid Credential!",
          },
        };
      }

      // 2️⃣ Block inactive accounts
      if (!user.isActive) {
        return {
          businessError: {
            type: ServiceError.FORBIDDEN,
            message: "Account is inactive. Contact admin.",
          },
        };
      }

      // 3️⃣ Verify password
      const passwordMatches = await argon.verify(
        user.passwordHash,
        loginDto.password,
      );

      if (!passwordMatches) {
        return {
          businessError: {
            type: ServiceError.FORBIDDEN,
            message: "Invalid Credential!",
          },
        };
      }

      // 4️⃣ Strip passwordHash before sending in the token
      const { passwordHash, ...safeUser } = user;

      return {
        data: await this.signToken(safeUser),
      };
    } catch (e) {
      return { prismaError: e };
    }
  }

  // ============================================
  // SIGN TOKEN
  // ============================================
  async signToken(
    user: Record<string, any>,
  ): Promise<{ token: string; user: Record<string, any> }> {
    const payload = { user };
    const secret = this.config.get<string>("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "12h",
      secret,
    });

    return { token, user };
  }

  // ============================================
  // LOGOUT (stateless JWT)
  // ============================================
  async logOut(email: string): Promise<IServiceData> {
    try {
      const isExist = await this.prisma.user.findFirst({
        where: { email },
      });

      if (!isExist) {
        return {
          businessError: {
            type: ServiceError.BAD_REQUEST,
            message: "User does not exists",
          },
        };
      }

      // Stateless JWT — nothing to persist server-side.
      return { data: "User logged out successfully!!" };
    } catch (e) {
      return { prismaError: e };
    }
  }
}
