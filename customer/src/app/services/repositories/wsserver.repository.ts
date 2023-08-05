import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import {IWSServer} from "../../model/dto/wsserver.interface";

@Injectable()
export class WSServerRepository{
    constructor(protected dataService: DataService) {}

    public loadAll(sortBy: string = "pos", sortDir: number = 1): Promise<IWSServer[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy, sortDir};
            this.dataService.wsserversAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }
}
