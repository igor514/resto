import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Currency } from "src/model/orm/currency.entity";
import { jwtConstants } from "../../common/auth.constants";
import { CurrenciesController } from "./currencies.controller";
import { CurrenciesService } from "./currencies.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Currency,
            Admin,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [CurrenciesService],
    controllers: [CurrenciesController],
})
export class CurrenciesModule {}
