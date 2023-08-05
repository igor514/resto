import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { EmployeesGuard } from "src/common/guards/employees.guard";
import { Table } from "src/model/orm/table.entity";
import { TablesService } from "./tables.service";

@Controller('restorator/tables')
export class TablesController {
    constructor (private tablesService: TablesService) {}            

    // get all
    @UseGuards(EmployeesGuard)
    @Post("all-by-restaurant/:restaurant_id")
    public allByRestaurant(@Param("restaurant_id") restaurant_id: string): Promise<IAnswer<Table[]>> {
        return this.tablesService.allByRestaurant(parseInt(restaurant_id));
    }       
}
