import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { FilesController } from "./files.controller";
import { jwtConstants } from "../../common/auth.constants";
import { CommonModule } from "src/common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

@Module({
    imports: [        
        JwtModule.register(jwtConstants),
        CommonModule,
        TypeOrmModule.forFeature([Admin]),
    ],    
    controllers: [FilesController],
    providers: [],
})
export class FilesModule {}
