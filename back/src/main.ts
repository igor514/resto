import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {join} from 'path';
import * as express from 'express';
import * as fs from "fs";
import {VersioningType} from "@nestjs/common";
import {db_login, db_name, db_password, db_port, db_schema, defaultVersion} from "./config/options";
import {DataSource} from "typeorm";
import {corsedUrl, getMode} from "./config/cors";


export const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: db_port,
	username: db_login,
	password: db_password,
	database: db_name,
	schema: db_schema
})

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bodyParser: false });
	await dataSource.initialize()

	app.setGlobalPrefix('api')
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: defaultVersion,
	})

	const static_path = join(__dirname, '../../', 'static')
	!fs.existsSync(static_path) ? fs.mkdirSync(static_path, {recursive: true}) : null;
	app.use('/', express.static(static_path))

	app.enableCors({origin: corsedUrl()});
	await app.listen(3044);
}

bootstrap();
