import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Serving } from "src/model/orm/serving.entity";
import { ServingsController } from "./servings.controller";
import { ServingsService } from "./servings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Serving]),        
    ],    
    providers: [ServingsService],
    controllers: [ServingsController],
})
export class ServingsModule {}
