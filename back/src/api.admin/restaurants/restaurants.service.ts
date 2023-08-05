import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Restaurant } from "../../model/orm/restaurant.entity";
import { IRestaurantCreate } from "./dto/restaurant.create.interface";
import { IRestaurantUpdate } from "./dto/restaurant.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
import {RestaurantFeeConfig} from "../../model/orm/restaurant.fee.config";
import {loadWithFees} from "../../utils/restaurants";
import {FeeService} from "../../common/fee.service";

@Injectable()
export class RestaurantsService extends APIService {
    constructor (
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(RestaurantFeeConfig) private feeRepository: Repository<RestaurantFeeConfig>,
        private feeService: FeeService,
    ) {
        super();
    }   
    
    public async all(dto: IGetAll): Promise<IAnswer<Restaurant[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const data: Restaurant[] = await this.restaurantRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async allWithCats(dto: IGetAll): Promise<IAnswer<Restaurant[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;            
            const data: Restaurant[] = await this.restaurantRepository
                .createQueryBuilder("restaurants")
                .leftJoinAndSelect("restaurants.cats", "cats")
                .where(this.filterToQbfilter(filter, "restaurants"))
                .orderBy("restaurants."+sortBy, sortDir)
                .addOrderBy("cats.name", "ASC")
                .getMany();
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Restaurant[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const filter: Object = dto.filter;
            const data: Restaurant[] = await this.restaurantRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});
            const allLength: number = await this.restaurantRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Restaurant>> {
        try {
            let data: Restaurant = await loadWithFees(id, this.restaurantRepository, this.feeRepository);
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IRestaurantCreate): Promise<IAnswer<void>> {        
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }
            const {fees, ...rest} = dto
            let x: Restaurant = this.restaurantRepository.create(rest);
            await this.restaurantRepository.save(x);
            for (const f of fees) {
                let {secret_key} = f
                try { secret_key = await this.feeService.validateFee(f)
                } catch (error) { return {statusCode: 400, error} }
                await this.feeRepository.save(this.feeRepository.create({...f, restaurant_id: x.id, secret_key}))
            }

            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IRestaurantUpdate): Promise<IAnswer<void>> {
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }

            const {fees, id, ...rest} = dto
            for (let fee of fees) {
                let {secret_key} = fee
                try { secret_key = await this.feeService.validateFee(fee)
                } catch (error) { return {statusCode: 400, error} }
                await this.feeRepository.update({payment_type: fee.payment_type, restaurant_id: fee.restaurant_id}, {...fee, secret_key})
            }

            await this.restaurantRepository.update(id, rest);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.restaurantRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.restaurantRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in RestaurantsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

}
