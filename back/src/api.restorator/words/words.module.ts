import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Lang } from "src/model/orm/lang.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Wordbook,
            Lang,
        ])
    ],    
    providers: [WordsService],
    controllers: [WordsController],
})
export class WordsModule {}
