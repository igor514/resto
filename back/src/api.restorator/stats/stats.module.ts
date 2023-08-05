import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "src/model/orm/employee.entity";
import { Hall } from "src/model/orm/hall.entity";
import { Order } from "src/model/orm/order.entity";
import { jwtConstants } from "../../common/auth.constants";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Hall,            
            Employee,   
            Order,         
        ]),
        JwtModule.register(jwtConstants),        
    ],    
    providers: [StatsService],
    controllers: [StatsController],
})
export class StatsModule {}
