import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/model/orm/admin.entity";

import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { jwtConstants } from "../../common/auth.constants";
import { MailtemplatesController } from "./mailtemplates.controller";
import { MailtemplatesService } from "./mailtemplates.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Mailtemplate, Admin]),
        JwtModule.register(jwtConstants),
    ],    
    providers: [MailtemplatesService],
    controllers: [MailtemplatesController],
})
export class MailtemplatesModule {}
