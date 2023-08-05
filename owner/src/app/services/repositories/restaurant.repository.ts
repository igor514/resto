import { Injectable } from "@angular/core";
import { IChunk } from "src/app/model/chunk.interface";
import { IGetChunk } from "src/app/model/dto/getchunk.interface";
import { IRestaurantRecharge } from "src/app/model/dto/restaurant.recharge.interface";
import { Restaurant } from "src/app/model/orm/restaurant.model";
import { DataService } from "../data.service";
import { Repository2 } from "./_repository2";
import {IRestaurantOnboard} from "../../model/dto/restaurant.onobard.dto";

@Injectable()
export class RestaurantRepository extends Repository2 {
    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadChunk(part: number, sortBy: string = "created_at", sortDir: number = -1, filter: any = {}): Promise<IChunk<Restaurant>> {
        return new Promise((resolve, reject) => {
            const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
            this.dataService.restaurantsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    const chunk: IChunk<Restaurant> = {data: res.data.map(d => new Restaurant().build(d)), allLength: res.allLength};
                    resolve(chunk);
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public loadOne(id: number): Promise<Restaurant> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    let x: Restaurant = new Restaurant().build(res.data);
                    resolve(x);
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public create(x: Restaurant): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.restaurantsCreate(x).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
    }

    public update(x: Restaurant): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsUpdate(x).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public recharge(dto: IRestaurantRecharge): Promise<number> {
        return new Promise((resolve, reject) => this.dataService.restaurantsRecharge(dto).subscribe(res => resolve(res.statusCode), err => reject(err.message)));
    }

    public onboard(dto: IRestaurantOnboard): Promise<string> {
      return new Promise((resolve, reject) => {
        this.dataService.restaurantsOnboard(dto)
          .subscribe(res => {
            if (res.statusCode !== 200) {
              reject(res.error)
            }
            resolve(res.data.url)
          }, res => reject(res.message))
      })
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsDelete(id).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }
}
