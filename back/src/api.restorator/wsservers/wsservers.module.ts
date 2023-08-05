import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {WSServer} from "src/model/orm/wsserver.entity";
import {jwtConstants} from "../../common/auth.constants";
import {WSServersController} from "./wsservers.controller";
import {CommonModule} from "../../common/common.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            WSServer,
        ]),
        CommonModule,
        JwtModule.register(jwtConstants),
    ],
    providers: [],
    controllers: [WSServersController],
})
export class WSServersModule {
}
