import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";
import {defaultVersion} from "./options";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api')
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion
	})

	await app.listen(3045);
}

bootstrap();
