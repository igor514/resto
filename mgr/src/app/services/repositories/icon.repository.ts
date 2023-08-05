import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import {Icon, IconType} from '../../model/orm/icon.model';
import { IGetAll } from '../../model/dto/getall.interface';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class IconRepository extends Repository<Icon> {
    public schema: string = "icon";
    public schemaMl: string = "iconTranslation";
    public allSortBy: string = "pos";
    public chunkSortBy: string = "pos";
    public filterIconType: string = null

    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadAll(filter: any = {}): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {
                  sortBy: this.allSortBy,
                  sortDir: this.allSortDir,
                  filter
            };

            this.dataService.iconsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Icon().build(d)) : [];
                    resolve();
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);

            });
        });
    }

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            const filter: Partial<Icon> = {}
            if (this.filterIconType) {
              filter.type = this.filterIconType as IconType
            }
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,
                filter
            };
            this.dataService.iconsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlChunk = res.data.length ? res.data.map(d => new Icon().build(d)) : [];
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

    public loadOne(id: number): Promise<Icon> {
        return new Promise((resolve, reject) => {
            this.dataService.iconsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Icon = new Icon().build(res.data);
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
            this.dataService.iconsDelete(id).subscribe(res => {
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
            this.dataService.iconsDeleteBulk(ids).subscribe(res => {
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

    public create(x: Icon): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.iconsCreate(x).subscribe(res => {
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

    public update(x: Icon): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.iconsUpdate(x).subscribe(res => {
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
