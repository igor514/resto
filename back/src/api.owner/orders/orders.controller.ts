import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { OrdersService } from "./orders.service";
import { Order } from "../../model/orm/order.entity";
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('owner/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}                

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Order[]>> {
        return this.ordersService.chunk(dto);
    }    
}
