import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Admin } from "../../model/orm/admin.entity";
import { jwtConstants } from "../../common/auth.constants";
import { AdminsController } from "./admins.controller";
import { AdminsService } from "./admins.service";
import {CommonModule} from "../../common/common.module";
import {Log} from "../../model/orm/log.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin, Log]),
        JwtModule.register(jwtConstants),
        CommonModule,
    ],    
    providers: [
        AdminsService,        
    ],
    controllers: [AdminsController],    
})
export class AdminsModule {}
