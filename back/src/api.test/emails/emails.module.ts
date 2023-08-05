import { Module } from "@nestjs/common";
import { CommonModule } from "src/common/common.module";
import { EmailsController } from "./emails.controller";
import { EmailsService } from "./emails.service";

@Module({
    imports: [CommonModule],
    providers: [EmailsService],
    controllers: [EmailsController],
})
export class EmailsModule {}
