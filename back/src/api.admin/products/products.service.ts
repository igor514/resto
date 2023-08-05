import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, IsNull, Repository } from "typeorm";
import { IAnswer } from 'src/model/dto/answer.interface';
import { IGetChunk } from "src/model/dto/getchunk.interface";
import { APIService } from "../../common/api.service";
import { Product } from "../../model/orm/product.entity";
import { IProductCreate } from "./dto/product.create.interface";
import { IProductUpdate } from "./dto/product.update.interface";
import { Sortdir } from "src/model/sortdir.type";
import { IGetAll } from "src/model/dto/getall.interface";
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
    
    public async all(dto: IGetAll): Promise<IAnswer<Product[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const filter: Object = dto.filter;
            const data: Product[] = await this.productRepository.find({where: filter, order: {[sortBy]: sortDir}});             
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.all: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    } 
    
    public async chunk(dto: IGetChunk): Promise<IAnswer<Product[]>> {
        try {
            const sortBy: string = dto.sortBy;
            const sortDir: Sortdir = dto.sortDir === 1 ? "ASC" : "DESC";
            const from: number = dto.from;
            const q: number = dto.q;
            const filter: Object = dto.filter;
            const data: Product[] = await this.productRepository.find({where: filter, order: {[sortBy]: sortDir}, take: q, skip: from, relations: ["cat", "restaurant"]});
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
                .leftJoinAndSelect("ingredients.type", "type")
                .leftJoinAndSelect("ingredients.unit", "units")
                .leftJoinAndSelect("units.translations", "translations")
                .leftJoinAndSelect("type.unit", "tunit")
                .leftJoinAndSelect("tunit.translations", "ttransl")
                .leftJoinAndSelect("tunit.related", "trel")
                .leftJoinAndSelect("units.related", "urel")
                .where("product.id = :id", {id})
                .orderBy({"images.pos": "ASC", "ingredients.pos": "ASC"})                
                .getOne();                  
            return {statusCode: 200, data};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.one: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async create(dto: IProductCreate): Promise<IAnswer<void>> {        
        try { 
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }            
            
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
            if (!dto.name) {
                return {statusCode: 400, error: "required field is empty"};
            }  
            
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

    public async deleteBulk(ids: number[]): Promise<IAnswer<void>> {
        try {            
            await this.productRepository.delete(ids);
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ProductsService.deleteBulk: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async fake(): Promise<string> {
        try {
            for (let i = 1; i <= 100; i++) {
                let p = new Product();
                p.restaurant_id = 21;
                p.cat_id = 1;
                p.code = "hf000" + i;
                p.name = "Какое-то блюдо " + i;
                p.price = 1000;
                p.weight = 500;
                p.cal = 600;
                p.time = "15 мин";
                p.about = "Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда";
                p.pos = 100 + i;
                p.active = true;                
                p.images = [];
                p.images[0] = new ProductImage();
                p.images[0].img = "2021-9/1632350544594_500.jpg";
                p.images[1] = new ProductImage();
                p.images[1].img = "2021-9/1632350619186_500.jpg";
                await this.productRepository.save(p);
            }            
            
            return "ok";
        } catch (err) {
            let errTxt: string = `Error in ProductsService.fake: ${String(err)}`;
            console.log(errTxt);
            return "failed";
        }
    }

    private deleteUnbindedImages(): Promise<DeleteResult> {
        return this.productImageRepository.delete({product_id: IsNull()});
    }

    private deleteUnbindedIngredients(): Promise<DeleteResult> {
        return this.ingredientRepository.delete({product_id: IsNull()});
    }
}
