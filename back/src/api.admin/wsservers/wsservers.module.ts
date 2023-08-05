import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Admin} from "src/model/orm/admin.entity";
import {WSServer} from "src/model/orm/wsserver.entity";
import {jwtConstants} from "../../common/auth.constants";
import {WSServersController} from "./wsservers.controller";
import {WSService} from "./wsservers.service";
import {CommonModule} from "../../common/common.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WSServer,
            Admin,
        ]),
        CommonModule,
        JwtModule.register(jwtConstants),
    ],
    providers: [WSService],
    controllers: [WSServersController],
})
export class WSServersModule {
}
