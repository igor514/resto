import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {APIService} from "../../common/api.service";
import {FacilityType} from "../../model/orm/facility.type.entity"
import {IFacilityTypeCreate} from "./dto/facility.types.create.interface";
import {IFacilityTypeUpdate} from "./dto/facility.types.update.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";

@Injectable()
export class FacilityTypesService extends APIService {
    constructor(@InjectRepository(FacilityType) private facilityTypeRepository: Repository<FacilityType>) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<FacilityType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: FacilityType[] = await this.facilityTypeRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                relations: ["translations"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<FacilityType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: FacilityType[] = await this.facilityTypeRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["translations"]
            });
            let allLength: number = await this.facilityTypeRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<FacilityType>> {
        try {
            let data: FacilityType = await this.facilityTypeRepository.findOne({
                where: {id},
                relations: ["translations"]
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IFacilityTypeCreate): Promise<IAnswer<void>> {
        try {
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }

            if (dto.priority === null) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: FacilityType = this.facilityTypeRepository.create(dto);
            await this.facilityTypeRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IFacilityTypeUpdate): Promise<IAnswer<void>> {
        try {
            for (let t of dto.translations) {
                if (!t.name) {
                    return {statusCode: 400, error: "required field is empty"};
                }
            }

            if (dto.priority === null) {
                return {statusCode: 400, error: "required field is empty"};
            }

            let x: FacilityType = this.facilityTypeRepository.create(dto);
            await this.facilityTypeRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.facilityTypeRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.facilityTypeRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in FacilityTypeService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
