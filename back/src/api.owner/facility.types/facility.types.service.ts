import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {APIService} from "../../common/api.service";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetAll} from "src/model/dto/getall.interface";
import {Sortdir} from "src/model/sortdir.type";
import {FacilityType} from "../../model/orm/facility.type.entity";

@Injectable()
export class FacilityTypesService extends APIService {
    constructor(@InjectRepository(FacilityType) private facilityTypesRepository: Repository<FacilityType>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<FacilityType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";

        try {
            let data: FacilityType[] = await this.facilityTypesRepository.find({
                order: {[sortBy]: sortDir},
                relations: ['translations']

            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
