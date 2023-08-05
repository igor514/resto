import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Icon } from "src/model/orm/icon.entity";
import { jwtConstants } from "../../common/auth.constants";
import { IconsController } from "./icons.controller";
import { IconsService } from "./icons.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Icon, Admin]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [IconsService],
    controllers: [IconsController],
})
export class IconsModule {}
