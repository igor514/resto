import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "src/common/auth.constants";
import { Employee } from "src/model/orm/employee.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Serving } from "src/model/orm/serving.entity";
import { ServingsController } from "./servings.controller";
import { ServingsService } from "./servings.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Serving,
            Employee,
            Lang,
        ]),     
        JwtModule.register(jwtConstants),   
    ],        
    providers: [ServingsService],
    controllers: [ServingsController],
    exports: [ServingsService],
})
export class ServingsModule {}
