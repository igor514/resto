import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";
import { Hall } from "src/model/orm/hall.entity";
import { jwtConstants } from "../../common/auth.constants";
import { TablesController } from "./tables.controller";
import { TablesService } from "./tables.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Hall,
            Employee,
        ]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [TablesService],
    controllers: [TablesController],
})
export class TablesModule {}
