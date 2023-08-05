import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { IWSServer } from 'src/app/model/orm/wsserver.interface';
import { Repository2 } from './_repository2';

@Injectable()
export class WSServerRepository extends Repository2 {
    constructor(protected dataService: DataService) {
        super(dataService);
    }

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
