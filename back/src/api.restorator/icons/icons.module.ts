import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";

import { Icon } from "src/model/orm/icon.entity";
import { Lang } from "src/model/orm/lang.entity";
import { jwtConstants } from "../../common/auth.constants";
import { IconsController } from "./icons.controller";
import { IconsService } from "./icons.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Icon, 
            Lang,
            Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [IconsService],
    controllers: [IconsController],
})
export class IconsModule {}
