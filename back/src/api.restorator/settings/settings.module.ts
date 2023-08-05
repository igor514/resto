import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Setting } from "../../model/orm/setting.entity";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Setting]),        
    ],
    exports: [SettingsService],
    providers: [SettingsService],
    controllers: [SettingsController],
})
export class SettingsModule {}
