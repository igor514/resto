import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { TransactionsService } from "./transactions.service";
import { Transaction } from "../../model/orm/transaction.entity";
import { AdminsGuard } from "src/common/guards/admins.guard";

@Controller('owner/transactions')
export class TransactionsController {
    constructor (private transactionsService: TransactionsService) {}                

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Transaction[]>> {
        return this.transactionsService.chunk(dto);
    }    
}
