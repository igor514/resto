import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Words } from "src/model/words.type";
import { Lang } from "src/model/orm/lang.entity";

@Injectable()
export class WordsService extends APIService {
    constructor (
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
    ) {
        super();
    } 
    
    public async all(): Promise<IAnswer<Words>> {        
        try {
            let data = {};
            let wbl = await this.wordbookRepository.find({relations: ["words", "words.translations"]});
            let ll = await this.langRepository.find({where: {active: true}});

            for (let wb of wbl) {
                data[wb.name] = {};

                for (let w of wb.words) {
                    data[wb.name][w.mark] = {};
                    
                    for (let l of ll) {
                        data[wb.name][w.mark][l.slug] = w.translations.find(t => t.lang_id === l.id).text;
                    }
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
