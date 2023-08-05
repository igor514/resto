import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {IGetAll} from 'src/app/model/dto/getall.interface';
import {Repository2} from './_repository2';
import {FacilityType} from "../../model/orm/facility.type.model";

@Injectable()
export class FacilityTypesRepository extends Repository2 {
  public types: FacilityType[] = [];

  constructor(protected dataService: DataService) {
    super(dataService);
  }

  public loadAll(sortBy: string = 'id', sortDir: number = 1): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {sortBy, sortDir};
      this.dataService.facilityTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.types = res.data.map(d => new FacilityType().build(d));
          resolve();
        } else {
          reject(res.statusCode + ': ' + res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }
}
