import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { Order } from "src/model/orm/order.entity";
import { Table } from "src/model/orm/table.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import {Room} from "../../model/orm/room.entity";
import {Restaurant} from "../../model/orm/restaurant.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order,            
            Table,
            Room,
            Restaurant,
        ]),   
        CommonModule,
    ],    
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
