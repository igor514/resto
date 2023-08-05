import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Restaurant } from '../../model/orm/restaurant.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class RestaurantRepository extends Repository<Restaurant> {
    public schema: string = "restaurant";
    public allSortBy: string = "name";
    public chunkSortBy: string = "name";
    public filterTypeId: number;

    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,
            };
            this.dataService.restaurantsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Restaurant().build(d)) : [];
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public loadAllWithCats(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,
            };
            this.dataService.restaurantsAllWithCats(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Restaurant().build(d)) : [];
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }

    public loadChunk(category?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const filter: any = {}
            if (this.filterTypeId !== -1) {
              filter.type_id = this.filterTypeId;
            }
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,
                filter
            };
            this.dataService.restaurantsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlChunk = res.data.length ? res.data.map(d => new Restaurant().build(d)) : [];
                    this.allLength = res.allLength;
                    resolve();
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
                    if (res.data) {
                        let x: Restaurant = new Restaurant().build(res.data);
                        resolve(x);
                    } else {
                        reject("Object not found");
                    }
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);

            });
        });
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

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsDeleteBulk(ids).subscribe(res => {
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

    public create(x: Restaurant): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.restaurantsCreate(x).subscribe(res => {
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
}
