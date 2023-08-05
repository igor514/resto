import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomsController } from "./rooms.controller";
import { RoomsService } from "./rooms.service";
import {Room} from "../../model/orm/room.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
    ],    
    providers: [RoomsService],
    controllers: [RoomsController],
})
export class RoomsModule {}
