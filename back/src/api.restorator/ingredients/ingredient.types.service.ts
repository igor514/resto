import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IAnswer} from 'src/model/dto/answer.interface';
import {IGetChunk} from "src/model/dto/getchunk.interface";
import {APIService} from "../../common/api.service";
import {Sortdir} from "src/model/sortdir.type";
import {Ingredient} from "src/model/orm/ingredient.entity";
import {IngredientType} from "../../model/orm/ingredient.type.entity";
import {IngredientTypesCreateDto} from "./dto/ingredient.types.create.dto";
import {IngredientTypesUpdateDto} from "./dto/ingredient.types.update.dto";
import {Unit} from "src/model/orm/unit.entity";

@Injectable()
export class IngredientTypesService extends APIService {
    constructor(
        @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
        @InjectRepository(IngredientType) private typesRepository: Repository<IngredientType>,
        @InjectRepository(Unit) private unitRepository: Repository<Unit>,
    ) {
        super();
    }

    async loadUnits(unit_id: number): Promise<Unit> {
        const unit = await this.unitRepository.findOne({
            where: {id: unit_id},
            relations: ['translations']
        })
        if (unit.related_id) {
            unit.related = await this.unitRepository.findOne({
                where: {id: unit.related_id},
                relations: ['translations', 'units', 'units.translations']

            })
            unit.related.units = unit.related.units.filter(u => u.id !== unit.id)
        }
        return unit;
    }

    public async all(dto: IGetChunk): Promise<IAnswer<IngredientType[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let filter: Partial<IngredientType> = dto.filter


            let data: IngredientType[] = await this.typesRepository.find({
                where: filter,
                order: {[sortBy]: sortDir},
            })
            data = await Promise.all(data.map(async (i) => {
                return {...i, unit: await this.loadUnits(i.unit_id)}
            }))


            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in IngredientTypesService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async chunk(dto: IGetChunk): Promise<IAnswer<IngredientType[]>> {
        let sortBy: string = dto.sortBy;
        let sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
        let from: number = dto.from;
        let q: number = dto.q;
        let filter: Object = dto.filter;

        try {
            let data: IngredientType[] = await this.typesRepository.find(
                {
                    where: filter, order: {[sortBy]: sortDir}, take: q, skip: from,
                });
            data = await Promise.all(data.map(async (i) => {
                return {...i, unit: await this.loadUnits(i.unit_id)}
            }))
            let allLength: number = await this.typesRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in IngredientTypesService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<IngredientType>> {
        try {
            const data: IngredientType = await this.typesRepository.findOne(
                {where: {id}})
            data.unit = await this.loadUnits(data.unit_id)
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "item not found"};
        } catch (err) {
            let errTxt: string = `Error in IngredientTypesService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IngredientTypesCreateDto): Promise<IAnswer<void>> {
        try {
            let x: IngredientType = this.typesRepository.create(dto);
            await this.typesRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IngredientTypesService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async update(dto: IngredientTypesUpdateDto): Promise<IAnswer<void>> {
        try {
            let x: IngredientType = this.typesRepository.create(dto);
            await this.typesRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IngredientTypesService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.typesRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in IngredientTypesService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
