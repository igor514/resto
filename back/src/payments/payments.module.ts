import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../common/auth.constants";
import {Setting} from "../model/orm/setting.entity";
import {Restaurant} from "../model/orm/restaurant.entity";
import {PaymentsController} from "./payments.controller";
import {PaymentsService} from "./payments.service";
import {Admin} from "../model/orm/admin.entity";
import {CommonModule} from "../common/common.module";
import {PaymentConfig} from "../model/orm/payment.config.entity";
import {Employee} from "../model/orm/employee.entity";
import {Transaction} from "../model/orm/transaction.entity";
import {RestaurantFeeConfig} from "../model/orm/restaurant.fee.config";
import {PaymentConfigService} from "./payment.config.service";
import {Order} from "../model/orm/order.entity";
import {WebhookController} from "./webhook/webhook.controller";
import {WebhookService} from "./webhook/webhook.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Restaurant,
            Setting,
            Admin,
            Order,
            Employee,
            RestaurantFeeConfig,
            PaymentConfig,
            Transaction,
        ]),
        CommonModule,
        JwtModule.register(jwtConstants),
    ],
    exports: [],
    controllers: [PaymentsController, WebhookController],
    providers: [PaymentsService, PaymentConfigService, WebhookService],
})
export class PaymentsModule {
}