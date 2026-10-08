import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserProxy } from '@/shared/async-storage';

@Global()
@Module({
	providers: [PrismaService, UserProxy],
	exports: [PrismaService, UserProxy]
})
export class PrismaModule {}
