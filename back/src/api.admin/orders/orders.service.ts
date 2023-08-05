import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository } from "typeorm";
import { APIService } from "../../common/api.service";
import { Order } from "../../model/orm/order.entity";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IOrderUpdate } from "./dto/order.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { OrderProduct } from "src/model/orm/order.product.entity";
import { OrderProductIngredient } from "src/model/orm/order.product.ingredient.entity";

@Injectable()
export class OrdersService extends APIService {
    constructor (
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderProduct) private orderProductRepository: Repository<OrderProduct>,
        @InjectRepository(OrderProductIngredient) private orderProductIngredientRepository: Repository<OrderProductIngredient>,
    ) {
        super();
    }        

    public async chunk(dto: IGetChunk): Promise<IAnswer<Order[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const filter: Object = dto.filter;
            const data: Order[] = await this.orderRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from, relations: ["restaurant"]});
            const allLength: number = await this.orderRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            const errTxt: string = `Error in OrdersService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Order>> {
        try {
            const data: Order = await this.orderRepository.findOne({where: {id}, relations: ["products", "products.ingredients", "restaurant"]});
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.orderRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.orderRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
    
    public async update(dto: IOrderUpdate): Promise<IAnswer<void>> {
        try {            
            let x: Order = this.orderRepository.create(dto);
            await this.orderRepository.save(x);  
            await this.deleteUnbindedProducts();     
            await this.deleteUnbindedIngredients();     
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in OrdersService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }  
    
    private deleteUnbindedProducts(): Promise<DeleteResult> {
        return this.orderProductRepository.delete({order_id: IsNull()});
    }  

    private deleteUnbindedIngredients(): Promise<DeleteResult> {
        return this.orderProductIngredientRepository.delete({order_product_id: IsNull()});
    }  
}
