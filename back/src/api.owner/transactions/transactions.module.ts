import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Transaction } from "src/model/orm/transaction.entity";
import { jwtConstants } from "../../common/auth.constants";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transaction, Admin]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
