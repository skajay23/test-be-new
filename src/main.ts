import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/app.module';

import { json, urlencoded } from 'express';
import { BadRequestException } from '@nestjs/common';

const configService = new ConfigService();

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		logger: ['error', 'warn'] // ✅ production-এ debug বাদ
	});

	app.setGlobalPrefix('api');

	// ✅ Render/container restart-এ connection clean close
	app.enableShutdownHooks();

	// ============================================
	// Global Validation
	// ============================================
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: errors => {
				const formattedErrors = errors.map(err => ({
					property: err.property,
					value: err.value,
					constraints: err.constraints,
					children: err.children
				}));
				return new BadRequestException({
					message: 'Validation failed',
					errors: formattedErrors
				});
			}
		})
	);

	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ extended: true, limit: '50mb' }));

	// ============================================
	// Swagger (শুধু local/dev/staging)
	// ============================================
	const SWAGGER_ENVS = ['local', 'dev', 'development', 'staging'];

	if (SWAGGER_ENVS.includes(configService.get('NODE_ENV'))) {
		const config = new DocumentBuilder()
			.setTitle('Milon Poultry Firm')
			.setDescription('The Milon Poultry Firm API description')
			.setVersion(configService.get('npm_package_version') || '1.0')
			.addTag('milon-poultry')
			.addBearerAuth()
			.build();

		const options: SwaggerDocumentOptions = {
			operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
		};

		const document = SwaggerModule.createDocument(app, config, options);
		SwaggerModule.setup('swagger', app, document, {
			useGlobalPrefix: true
		});
	}

	// ============================================
	// Start server
	// ============================================
	const port = Number(configService.get('BE_PORT')) || 8080;
	await app.listen(port, '0.0.0.0'); // ✅ Render-এর জন্য জরুরি

	console.log(`🚀 Server running on: http://0.0.0.0:${port}/api`);
}
bootstrap();
