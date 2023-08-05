import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository, SelectQueryBuilder } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Product } from "../../model/orm/product.entity";
import { IProductCreate } from "./dto/product.create.interface";
import { IProductUpdate } from "./dto/product.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { ProductImage } from "src/model/orm/product.image.entity";
import { Ingredient } from "src/model/orm/ingredient.entity";
import { IProductUpdatePos } from "./dto/product.updatepos.interface";

@Injectable()
export class ProductsService extends APIService {
    constructor (
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
        @InjectRepository(Ingredient) private ingredientRepository: Repository<Ingredient>,
    ) {
        super();
    }    
    
    public async all(dto: IGetChunk): Promise<IAnswer<Product[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            let filter: string = "TRUE";

            if (dto.filter.cat_id) {
                filter += ` AND products.cat_id = '${dto.filter.cat_id}'`;
            }

            if (dto.filter.nameCode) {
                filter += ` AND (LOWER(products.name) LIKE LOWER('%${dto.filter.nameCode}%') OR LOWER(products.code) LIKE LOWER('%${dto.filter.nameCode}%'))`;
            }            
            
            const data: Product[] = await this.productRepository
                .createQueryBuilder("products")
                .leftJoinAndSelect("products.ingredients", "ingredients")
                .leftJoinAndSelect("products.images", "images")
                .leftJoinAndSelect("ingredients.type", "type")
                .leftJoinAndSelect("ingredients.unit", "units")
                .leftJoinAndSelect("type.unit", "tunit")
                .leftJoinAndSelect("tunit.related", "trel")
                .leftJoinAndSelect("units.related", "urel")
                .where(filter)
                .orderBy({
                    [`products.${sortBy}`]: sortDir,
                    "images.pos": "ASC",
                    "ingredients.pos": "ASC",
                })
                .getMany();                        
            
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.all: ${String(err)}`;
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
                .leftJoinAndSelect("ingredients.type", "type")
                .leftJoinAndSelect("ingredients.unit", "units")
                .leftJoinAndSelect("type.unit", "tunit")
                .leftJoinAndSelect("tunit.related", "trel")
                .leftJoinAndSelect("units.related", "urel")
                .where("product.id = :id", {id})
                .orderBy({"images.pos": "ASC", "ingredients.pos": "ASC"})                
                .getOne();                  
            return data ? {statusCode: 200, data} : {statusCode: 404, error: "product not found"};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IProductCreate): Promise<IAnswer<void>> {        
        try {            
            let x: Product = this.productRepository.create(dto);            
            await this.productRepository.save(x);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.create: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }

    public async update(dto: IProductUpdate): Promise<IAnswer<void>> {
        try { 
            let x: Product = this.productRepository.create(dto);
            await this.productRepository.save(x);   
            await this.deleteUnbindedImages();     
            await this.deleteUnbindedIngredients();    
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.update: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        } 
    }

    public async updatePositions(dto: IProductUpdatePos[]): Promise<IAnswer<void>> {
        try {
            await this.productRepository.save(dto);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.updatePositions: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }
    
    public async delete(id: number): Promise<IAnswer<void>> {
        try {
            await this.productRepository.delete(id);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.delete: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }        
    }    

    private deleteUnbindedImages(): Promise<DeleteResult> {
        return this.productImageRepository.delete({product_id: IsNull()});
    }

    private deleteUnbindedIngredients(): Promise<DeleteResult> {
        return this.ingredientRepository.delete({product_id: IsNull()});
    }
}
