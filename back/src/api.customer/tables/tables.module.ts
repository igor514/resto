import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Table } from "src/model/orm/table.entity";
import { TablesController } from "./tables.controller";
import { TablesService } from "./tables.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Table]),        
    ],    
    providers: [TablesService],
    controllers: [TablesController],
})
export class TablesModule {}
