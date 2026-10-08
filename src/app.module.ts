import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from '@/prisma/prisma.module';

import { UserProxy } from '@/shared/async-storage';

import { AuthModule } from '@/auth/auth.module';


// import { UploadModule } from '@/api/upload/upload.module';
// import { UploadService } from '@/api/upload/upload.service';

@Module({
	imports: [
		ClsModule.forFeature(UserProxy),
		PrismaModule,
		AuthModule,
		// UploadModule,
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot()
	],
	controllers: []
	// providers: [UploadService]
})
export class AppModule {}
