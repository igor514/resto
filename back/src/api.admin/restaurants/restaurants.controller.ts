import {Controller, Param, Post, Body, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";

import {IGetChunk} from "../../model/dto/getchunk.interface";
import {IAnswer} from 'src/model/dto/answer.interface';
import {RestaurantsService} from "./restaurants.service";
import {Restaurant} from "../../model/orm/restaurant.entity";
import {IRestaurantUpdate} from "./dto/restaurant.update.interface";
import {IRestaurantCreate} from "./dto/restaurant.create.interface";
import {IGetAll} from "src/model/dto/getall.interface";
import {AdminsGuard} from "src/common/guards/admins.guard";

@Controller('admin/restaurants')
export class RestaurantsController {
    constructor(
        private restaurantsService: RestaurantsService,
    ) {
    }


    // get all
    @UseGuards(AdminsGuard)
    @Post("all")
    public all(@Body() dto: IGetAll): Promise<IAnswer<Restaurant[]>> {
        return this.restaurantsService.all(dto);
    }

    // get all with related cats
    @UseGuards(AdminsGuard)
    @Post("all-with-cats")
    public allWithCats(@Body() dto: IGetAll): Promise<IAnswer<Restaurant[]>> {
        return this.restaurantsService.allWithCats(dto);
    }

    // get fragment
    @UseGuards(AdminsGuard)
    @Post("chunk")
    public chunk(@Body() dto: IGetChunk): Promise<IAnswer<Restaurant[]>> {
        return this.restaurantsService.chunk(dto);
    }

    // get one
    @UseGuards(AdminsGuard)
    @Post("one/:id")
    public one(@Param("id") id: string): Promise<IAnswer<Restaurant>> {
        return this.restaurantsService.one(parseInt(id));
    }

    // create
    @UseGuards(AdminsGuard)
    @Post("create")
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    public create(@Body() dto: IRestaurantCreate): Promise<IAnswer<void>> {
        return this.restaurantsService.create(dto);
    }

    // update
    @UseGuards(AdminsGuard)
    @Post("update")
    @UsePipes(new ValidationPipe({whitelist: true, skipNullProperties: true}))
    public update(@Body() dto: IRestaurantUpdate): Promise<IAnswer<void>> {
        return this.restaurantsService.update(dto);
    }

    // delete one
    @UseGuards(AdminsGuard)
    @Post("delete/:id")
    public delete(@Param("id") id: string): Promise<IAnswer<void>> {
        return this.restaurantsService.delete(parseInt(id));
    }

    // delete many
    @UseGuards(AdminsGuard)
    @Post("delete-bulk")
    public deleteBulk(@Body() ids: number[]): Promise<IAnswer<void>> {
        return this.restaurantsService.deleteBulk(ids);
    }
}
