import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Setting } from "src/model/orm/setting.entity";
import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Settings } from "src/model/settings.type";

@Injectable()
export class SettingsService extends APIService {
    constructor (@InjectRepository(Setting) private settingRepository: Repository<Setting>) {
        super();
    }    

    public async all(): Promise<IAnswer<Settings>> {        
        try {
            let sl: Setting[] = await this.settingRepository.find({where: {in_app: true}});            
            let data = {};

            for (let s of sl) {
                data[s.p] = s.v;
            }

            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in SettingsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
