import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { APIService } from "../../common/api.service";
import {Icon, IconType} from "../../model/orm/icon.entity";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import { Lang } from "src/model/orm/lang.entity";
import { IIcon } from "./dto/icon.interface";

@Injectable()
export class IconsService extends APIService {
    constructor (
        @InjectRepository(Icon) private iconRepository: Repository<Icon>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
    ) {
        super();
    }      
    
    public async all(dto: IGetAll): Promise<IAnswer<IIcon[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";            
            const langs: Lang[] = await this.langRepository.find({where: {active: true}});
            const data: IIcon[] = (await this.iconRepository.find({
                where: {img: Not(IsNull()), ...dto.filter},
                order: {[sortBy]: sortDir},
                relations: ["translations"]
            }))
                .map(x => this.buildMlIcon(x, langs));             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in IconsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 

    public buildMlIcon(icon: Icon, langs: Lang[]): IIcon {
        if (!icon) return null;
        
        return {
            id: icon.id,
            img: icon.img,
            pos: icon.pos,
            name: this.translationsToObject(icon.translations, "name", langs),
        };
    }    
}
