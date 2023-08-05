import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { jwtConstants } from "../../common/auth.constants";
import { Admin } from "../../model/orm/admin.entity";
import { AdminsController } from "./admins.controller";
import { AdminsService } from "./admins.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        JwtModule.register(jwtConstants),
        CommonModule,
    ],    
    providers: [
        AdminsService,        
    ],
    controllers: [AdminsController],
})
export class AdminsModule {}
