import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ObjectsController } from "./objects.controller";
import { ObjectsService } from "./objects.service";
import { jwtConstants } from "../../common/auth.constants";
import { Cat } from "src/model/orm/cat.entity";
import { Employee } from "src/model/orm/employee.entity";
import { Product } from "src/model/orm/product.entity";
import { Order } from "src/model/orm/order.entity";

@Module({
	controllers: [ObjectsController],
	providers: [ObjectsService],
	imports: [		
		JwtModule.register(jwtConstants),			
		TypeOrmModule.forFeature([			
			Cat,
			Product,
			Employee,
			Order,
		]),
	],
})
export class ObjectsModule {}
