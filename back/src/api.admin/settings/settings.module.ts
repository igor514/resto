import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Setting } from "../../model/orm/setting.entity";
import { jwtConstants } from "../../common/auth.constants";
import { SettingsController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { Admin } from "src/model/orm/admin.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Setting, Admin]),
        JwtModule.register(jwtConstants),
    ],
    exports: [SettingsService],
    providers: [SettingsService],
    controllers: [SettingsController],
})
export class SettingsModule {}
