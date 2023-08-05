import { Injectable } from "@angular/core";
import { RestaurantsListService } from "../restaurants.list.service";

@Injectable()
export class ActiveRestaurantsService extends RestaurantsListService {
    public filterActive: boolean = true;
}