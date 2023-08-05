import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lang } from "src/model/orm/lang.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { Order } from "src/model/orm/order.entity";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Word } from "src/model/orm/word.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import { FilesService } from "./files.service";
import { MailService } from "./mail.service";
import { SlugService } from "./slug.service";
import { SocketService } from "./socket/socket.service";
import {StripeService} from "./stripe.service";
import {PriceService} from "./price.service";
import {RestaurantFeeConfig} from "../model/orm/restaurant.fee.config";
import {Restaurant} from "../model/orm/restaurant.entity";
import {PaymentConfig} from "../model/orm/payment.config.entity";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {Log} from "../model/orm/log.entity";
import {GroupService} from "./group.service";
import {UnitTranslation} from "../model/orm/unit.translation.entity";
import {Unit} from "../model/orm/unit.entity";
import {UnitService} from "./unit.service";
import {CryptoService} from "./crypto.service";
import {FeeService} from "./fee.service";
import {WSServersService} from "./ws-server.service";
import {IngredientTypesService} from "./ingredient.types.service";
import {IngredientType} from "../model/orm/ingredient.type.entity";
import {Ingredient} from "../model/orm/ingredient.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Mailtemplate,
            Restaurant,
            RestaurantFeeConfig,
            Setting,
            PaymentConfig,
            Wordbook,
            Word,        
            Order,
            OrderProduct,
            WSServer,    
            Lang,
            Log,
            Unit,
            UnitTranslation,
            IngredientType,
            Ingredient
        ]),
    ],
    providers: [
        MailService,
        FilesService,
        SlugService,     
        SocketService,
        StripeService,
        PriceService,
        SocketService,
        AuthInterceptor,
        GroupService,
        CryptoService,
        FeeService,
        WSServersService,
        UnitService,
        IngredientTypesService
    ],
    exports: [
        MailService,
        FilesService,
        SlugService,         
        SocketService,
        StripeService,
        PriceService,
        SocketService,
        AuthInterceptor,
        GroupService,
        CryptoService,
        FeeService,
        WSServersService,
        UnitService,
        IngredientTypesService,
    ],
})
export class CommonModule {}
