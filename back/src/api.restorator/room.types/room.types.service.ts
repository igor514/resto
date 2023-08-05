import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {IAnswer} from 'src/model/dto/answer.interface';
import {APIService} from "../../common/api.service";
import {RoomType} from "../../model/orm/room.type.entity"
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";

@Injectable()
export class RoomTypesService extends APIService {
    constructor(@InjectRepository(RoomType) private roomTypeRepository: Repository<RoomType>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<RoomType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";

        try {
            let data: RoomType[] = await this.roomTypeRepository.find({
                order: {[sortBy]: sortDir},
                relations: ["translations"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RoomTypeService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
