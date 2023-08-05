import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {Sortdir} from "src/model/sortdir.type";
import {IGetAll} from "src/model/dto/getall.interface";
import {APIService} from "./api.service";
import {Unit} from "../model/orm/unit.entity";
import {UnitTranslation} from "src/model/orm/unit.translation.entity";

@Injectable()
export class UnitService extends APIService {
    constructor(
        @InjectRepository(Unit) private unitsRepository: Repository<Unit>,
        @InjectRepository(UnitTranslation) private translationRepository: Repository<UnitTranslation>
    ) {
        super();
    }

    public async all(dto: IGetAll): Promise<IAnswer<Unit[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let filter: Object = dto.filter;

        try {
            let data: Unit[] = await this.unitsRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                relations: ["translations", 'units', 'units.translations']
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in UnitService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<Unit[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: Unit[] = await this.unitsRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
                take: q,
                skip: from,
                relations: ["translations", 'units', 'units.translations']
            });
            let allLength: number = await this.unitsRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in UnitService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Unit>> {
        try {
            let data: Unit = await this.unitsRepository.findOne({
                where: {id},
                relations: ["translations", 'units', 'units.translations']
            });
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in UnitService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: Partial<Unit>): Promise<IAnswer<void>> {
        try {
            let x: Unit = this.unitsRepository.create(dto);
            await this.unitsRepository.save(x);
            for (let t of dto.translations) {
                const translation = this.translationRepository.create({...t, unit_id: x.id})
                await this.translationRepository.save(translation)
            }
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UnitService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: Partial<Unit>): Promise<IAnswer<void>> {
        try {
            const {translations: tr, ...unit} = dto
            await this.unitsRepository.update({id: unit.id}, unit);
            await Promise.all(
                tr.map(t => this.translationRepository.update({id: t.id}, t))
            )
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UnitService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.unitsRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UnitService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {
            await this.unitsRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in UnitService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
