import { Injectable } from "@angular/core";
import { RestaurantsListService } from "../restaurants.list.service";

@Injectable()
export class InactiveRestaurantsService extends RestaurantsListService {
    public filterActive: boolean = false;
}