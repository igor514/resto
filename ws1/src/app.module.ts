import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppGateway} from './app.gateway';
import {AppService} from './app.service';
import {RedisModule} from "@liaoliaots/nestjs-redis";
import {redisConfig} from "./options";
import {StorageService} from "./storage.service";

@Module({
    controllers: [AppController],
    imports: [
        RedisModule.forRoot({
            config: {
                host: redisConfig.host,
                port: redisConfig.port
            }
        })
    ],
    providers: [
        AppService,
        StorageService,
        AppGateway
    ],
})
export class AppModule {}
