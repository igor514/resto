import { Controller, Param, Post, Body } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { OrdersService } from "./orders.service";
import { IOrderCreate } from "./dto/order.create.interface";
import { Order } from "src/model/orm/order.entity";
import { IOrderAdd } from "./dto/order.add.interface";
import { IOrderClose } from "./dto/order.close.interface";
import { IOrderCallWaiter } from "./dto/order.callwaiter.interface";

@Controller('customer/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}                    

    // create new order    
    @Post("create")
    public create(@Body() dto: IOrderCreate): Promise<IAnswer<Order>> {
        return this.ordersService.create(dto);
    }    

    // add products to order
    @Post("add")
    public add(@Body() dto: IOrderAdd): Promise<IAnswer<Order>> {
        return this.ordersService.add(dto);
    }   
    
    // check if order exists and active
    @Post("check/:id")
    public check(@Param("id") id: string): Promise<IAnswer<Order>> {
        return this.ordersService.check(parseInt(id));
    }   

    // close order (set status 'need_invoice' and payment method)
    @Post("close")
    public close(@Body() dto: IOrderClose): Promise<IAnswer<Order>> {
        return this.ordersService.close(dto);
    }  
    
    // call waiter
    @Post("call-waiter")
    public callWaiter(@Body() dto: IOrderCallWaiter): Promise<IAnswer<Order>> {
        return this.ordersService.callWaiter(dto);
    }
}
