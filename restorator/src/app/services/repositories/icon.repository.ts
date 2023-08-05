import { Injectable } from '@angular/core';
import { Icon } from '../../model/orm/icon.model';
import { DataService } from '../data.service';
import { IGetAll } from 'src/app/model/dto/getall.interface';
import { Repository2 } from './_repository2';

@Injectable()
export class IconRepository extends Repository2 {
    constructor(protected dataService: DataService) {
        super(dataService);
    }

    public loadAll(sortBy: string = "pos", sortDir: number = 1, filter: Partial<Icon> = {}): Promise<Icon[]> {
        return new Promise((resolve, reject) => {
            const dto: IGetAll = {sortBy, sortDir, filter};
            this.dataService.iconsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    resolve(res.data.map(d => new Icon().build(d)));
                } else {
                    reject(res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }
}
