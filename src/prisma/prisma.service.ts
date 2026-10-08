import * as argon2 from 'argon2';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private config: ConfigService) {
    super();
  }

  // ============================================
  // ON MODULE INIT
  // ============================================
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ ডাটাবেজ কানেক্টেড');

      await this.createRootAdmin();

      console.log('🎉 PrismaService ইনিশিয়ালাইজেশন সম্পন্ন');
    } catch (e) {
      console.error('❌ PrismaService onModuleInit ব্যর্থ:', e);
      throw e;
    }
  }

  // ============================================
  // ON MODULE DESTROY
  // ============================================
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('🔌 ডাটাবেজ ডিসকানেক্টেড');
    } catch (e) {
      console.error('❌ ডাটাবেজ ডিসকানেক্ট ব্যর্থ:', e);
    }
  }

  // ============================================
  // ROOT ADMIN
  // ============================================
  private async createRootAdmin() {
    try {
      const email = this.config.get<string>('ROOT_ADMIN_EMAIL');
      const password = this.config.get<string>('ROOT_ADMIN_PASSWORD');
      const name = this.config.get<string>('ROOT_ADMIN_NAME') || 'রুট এডমিন';

      if (!email || !password) {
        console.log('⚠️ ROOT_ADMIN_EMAIL বা ROOT_ADMIN_PASSWORD নেই, স্কিপ');
        return;
      }

      const passwordHash = await argon2.hash(password);

      const user = await this.user.upsert({
        where: { email },
        update: {
          name,
          role: UserRole.ADMIN,
          isActive: true,
        },
        create: {
          email,
          passwordHash,
          name,
          role: UserRole.ADMIN,
          isActive: true,
        },
      });

      console.log(`✅ রুট এডমিন তৈরি: ${user.email} (${user.role})`);
    } catch (err) {
      console.error('❌ রুট এডমিন তৈরি ব্যর্থ:', err);
      throw err;
    }
  }


}