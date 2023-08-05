import { Controller, Param, Post, Body, UseGuards } from "@nestjs/common";
import { IGetChunk } from "../../model/dto/getchunk.interface";
import { IAnswer } from 'src/model/dto/answer.interface';
import { ProductsService } from "./products.service";
import { Product } from "../../model/orm/product.entity";
import { IProductUpdate } from "./dto/product.update.interface";
import { IProductCreate } from "./dto/product.create.interface";
import { AdminsGuard } from "src/common/guards/admins.guard";
import { IGetAll } from "src/model/dto/getall.interface";

@Controller('admin/products')
export class ProductsController {
    constructor (private productsService: ProductsService) {}                

    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Product[]>> {
        return this.productsService.all(dto);
    }  

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Product[]>> {
        return this.productsService.chunk(dto);
    }
    
    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Product>> {
        return this.productsService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    public create(@Body() dto: IProductCreate): Promise<IAnswer<void>> {
        return this.productsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    public update(@Body() dto: IProductUpdate): Promise<IAnswer<void>> {
        return this.productsService.update(dto);
    }
    
    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.productsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.productsService.deleteBulk(ids);
    }

    @Post("fake")
    public fake(): Promise<string> {
        return this.productsService.fake();
    }
}
