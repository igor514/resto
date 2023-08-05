import { Controller, Param, Post } from "@nestjs/common";
import { IAnswer } from 'src/model/dto/answer.interface';
import { TablesService } from "./tables.service";
import { ITable } from "./dto/table.interface";

@Controller('customer/tables')
export class TablesController {
    constructor (private tablesService: TablesService) {}
    
    @Post("oneByCode/:code")
    public oneByCode(@Param("code") code: string): Promise<IAnswer<ITable>> {
        return this.tablesService.oneByCode(code);
    }
    
    @Post("oneById/:id")
    public oneById(@Param("id") id: string): Promise<IAnswer<ITable>> {
        return this.tablesService.oneById(parseInt(id));
    }
}
