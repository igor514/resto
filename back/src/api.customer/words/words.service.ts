import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Words } from "src/model/words.type";
import { Lang } from "src/model/orm/lang.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { IGetAll } from "src/model/dto/getall.interface";

@Injectable()
export class WordsService extends APIService {
    constructor (
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,        
    ) {
        super();
    } 
    
    public async all(dto: IGetAll): Promise<IAnswer<Words>> {                
        try {
            const lang = await this.langRepository.findOne({where: {id: dto.lang_id}});

            if (!lang) {
                return {statusCode: 404, error: "lang not found"};
            }

            const data = {};
            const wbl = await this.wordbookRepository.find({relations: ["words", "words.translations"]});            

            for (let wb of wbl) {
                data[wb.name] = {};

                for (let w of wb.words) {
                    data[wb.name][w.mark] = w.translations.find(t => t.lang_id === lang.id).text;                    
                }
            }
            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in WordsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
