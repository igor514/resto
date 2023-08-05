import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Lang } from "src/model/orm/lang.entity";
import { LangsController } from "./langs.controller";
import { LangsService } from "./langs.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Lang])
    ],    
    providers: [LangsService],
    controllers: [LangsController],
})
export class LangsModule {}
