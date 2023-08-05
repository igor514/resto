import { Module } from "@nestjs/common";
import { QRService } from "./qr.service";
import { QRController } from "./qr.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QRConfig} from "../../model/orm/qr.entity";
import {Restaurant} from "../../model/orm/restaurant.entity";
import {CommonModule} from "../../common/common.module";
import {Icon} from "../../model/orm/icon.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            QRConfig,
            Restaurant,
            Icon,
        ]),
        CommonModule,
    ],
    providers: [QRService],
    controllers: [QRController],
})
export class QRModule {}
