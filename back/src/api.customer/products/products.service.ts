import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository, SelectQueryBuilder } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Product } from "../../model/orm/product.entity";
import { Sortdir } from "src/model/sortdir.type";
import { ProductImage } from "src/model/orm/product.image.entity";
import { Ingredient } from "src/model/orm/ingredient.entity";

@Injectable()
export class ProductsService extends APIService {
    constructor (
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,        
        @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,        
    ) {
        super();
    }    
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Product[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            let filter: any = dto.filter;
            filter.active = true;            
                        
            const data: Product[] = await this.productRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from});

            // пришлось сделать отдельные запросы на присоединенные сущности
            // если использовать репозиторий, то нет возможности упорядочить присоединенные сущности
            // а если использовать queryBuilder, то у него не работает take-skip при присоединении МАССИВА (если джойнится один элемент - то все ок, если массив - то все плохо)
            for (let x of data) {
                const pil: ProductImage[] = await this.productImageRepository.find({where: {product_id: x.id}, order: {pos: "ASC"}});
                const il: Ingredient[] = await this.ingredientRepository.find({where: {product_id: x.id}, order: {pos: "ASC"}});
                x.images = pil;
                x.ingredients = il;
            }           
            
            const allLength: number = await this.productRepository.count(filter);
            return {statusCode: 200, data, allLength};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.chunk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async one(id: number): Promise<IAnswer<Product>> {
        try {            
            const data: Product = await this.productRepository
                .createQueryBuilder("product")
                .leftJoinAndSelect("product.images", "images")
                .leftJoinAndSelect("product.ingredients", "ingredients")
                .where("product.id = :id AND product.active = 'true'", {id})
                .orderBy({"images.pos": "ASC", "ingredients.pos": "ASC"})                
                .getOne();                  
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "product not found"};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 
    
    public async like(id: number): Promise<IAnswer<void>> {
        try {
            const product = await this.productRepository.findOne({where: {id}});

            if (!product) {
                return {statusCode: 404, error: "product not found"};
            }

            product.likes++;
            await this.productRepository.save(product);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.like: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
}
