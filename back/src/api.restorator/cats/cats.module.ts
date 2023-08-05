import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Cat } from "src/model/orm/cat.entity";
import { Employee } from "src/model/orm/employee.entity";
import { jwtConstants } from "../../common/auth.constants";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Cat,
            Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [CatsService],
    controllers: [CatsController],
})
export class CatsModule {}
