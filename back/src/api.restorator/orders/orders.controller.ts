import {Body, Controller, Param, Post, Res, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {IAnswer} from 'src/model/dto/answer.interface';
import {OrdersService} from "./orders.service";
import {Order, OrderStatus} from "../../model/orm/order.entity";
import {IGetAll} from "src/model/dto/getall.interface";
import {EmployeesGuard} from "src/common/guards/employees.guard";
import {IOrderAccept} from "./dto/order.accept.interface";
import {IOrder} from "../../model/dto/order.interface";
import {IOrderUpdate} from "./dto/order.update.interface";
import {IOrderCreate} from "./dto/order.create.interface";
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {Response} from "express";
import {GroupOrdersDto} from "./dto/group/group.orders.dto";
import {GetGroupDto} from "./dto/group/get.group.dto";
import {IGroupedOrders} from "./dto/group/grouped.orders.dto";
import {IGroupedOrder} from "./dto/group/grouped.order.dto";
import {IGroupResponse} from "./dto/group/group.response.interface";
import {GetGroupsDto} from "./dto/group/get.groups.dto";
import {IOrderPatch} from "./dto/group/order.patch.dto";

@Controller('restorator/orders')
export class OrdersController {
    constructor (private ordersService: OrdersService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Order[]>> {
        return this.ordersService.all(dto);
    } 

    // get fragment
    @UseGuards(EmployeesGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Order[]>> {
        return this.ordersService.chunk(dto);
    } 
    
    // accept
    @UseGuards(EmployeesGuard)
    @Post("accept")
    public accept(@Body() dto: IOrderAccept): Promise<IAnswer<void>> {
        return this.ordersService.accept(dto);
    }

    // get one
    @UseGuards(EmployeesGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<IOrder>> {
        return this.ordersService.one(parseInt(id));
    }  
    
    // set "cancelled" status
    @UseGuards(EmployeesGuard)
    @Post("cancel/:id")
    public cancel(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.ordersService.updateStatus(parseInt(id), OrderStatus.Cancelled);
    }  

    // set "completed" status
    @UseGuards(EmployeesGuard)
    @Post("complete/:id")
    public complete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.ordersService.updateStatus(parseInt(id), OrderStatus.Completed);
    }  

    // set "active" status
    @UseGuards(EmployeesGuard)
    @Post("activate/:id")
    public activate(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.ordersService.activate(parseInt(id));
    }  

    // update
    @UseGuards(EmployeesGuard)
    @Post("update")
    public update(@Body() dto: IOrderUpdate): Promise<IAnswer<void>> {
        return this.ordersService.update(dto);
    }

    // update
    @UseGuards(EmployeesGuard)
    @Post("create")
    public create(@Body() dto: IOrderCreate): Promise<IAnswer<void>> {
        return this.ordersService.create(dto);
    }

    // delete one
    @UseGuards(EmployeesGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.ordersService.delete(parseInt(id));
    }

    @Post("groups")
    @UsePipes(new ValidationPipe({skipNullProperties: true}))
    public groupsOne(@Body() body: GetGroupDto): Promise<IAnswer<IGroupedOrder>> {
        return this.ordersService.getGroupOne(body);
    }

    @Post("groups/all")
    @UsePipes(new ValidationPipe({skipNullProperties: true}))
    public groupAll(@Body() body: GetGroupsDto): Promise<IAnswer<IGroupedOrders>> {
        return this.ordersService.getGroupsAll(body);
    }

    @UseGuards(EmployeesGuard)
    @Post("group")
    @UsePipes(new ValidationPipe({skipNullProperties: true}))
    public group(@Body() body: GroupOrdersDto): Promise<IAnswer<IGroupResponse>> {
        return this.ordersService.group(body)
    }

    @UseGuards(EmployeesGuard)
    @Post("group/patch")
    @UsePipes(new ValidationPipe({skipNullProperties: true}))
    public patchGroup(@Body() body: IOrderPatch): Promise<IAnswer<void>> {
        return this.ordersService.patchGrouped(body)
    }

    // export to Excel file
    @UseGuards(EmployeesGuard)
    @Post("export")
    public async export(@Body() dto: IGetAll, @Res() res: Response): Promise<void> {
        const buffer = await this.ordersService.export(dto);
        res.set("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.set("Content-Disposition", "attachment; filename=orders.xlsx");
        res.end(buffer);
    }   
}
