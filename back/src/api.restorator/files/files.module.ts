import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FilesController } from "./files.controller";
import { jwtConstants } from "../../common/auth.constants";
import { CommonModule } from "src/common/common.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";

@Module({
    imports: [        
        JwtModule.register(jwtConstants),
        CommonModule,
        TypeOrmModule.forFeature([Employee]),
    ],    
    controllers: [FilesController],
    providers: [],
})
export class FilesModule {}
