import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Cat } from "src/model/orm/cat.entity";
import { jwtConstants } from "../../common/auth.constants";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Cat,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [CatsService],
    controllers: [CatsController],
})
export class CatsModule {}
