import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { IGetAll } from '../../model/dto/getall.interface';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import { FacilityType } from 'src/app/model/orm/facility.type.model';

@Injectable()
export class FacilityTypeRepository extends Repository<FacilityType> {
  public schema: string = "facilityType";
  public schemaMl: string = "facilityTypeTranslation";
  public allSortBy: string = "id";
  public chunkSortBy: string = "id";

  constructor(protected dataService: DataService) {
    super(dataService);
  }
  public loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {
        sortBy: this.allSortBy,
        sortDir: this.allSortDir,
      };
      this.dataService.facilityTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlAll = res.data.length ? res.data.map(d => new FacilityType().build(d)) : [];
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
      const dto: IGetChunk = {
        from: this.chunkCurrentPart * this.chunkLength,
        q: this.chunkLength,
        sortBy: this.chunkSortBy,
        sortDir: this.chunkSortDir,
      };
      this.dataService.facilityTypesChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlChunk = res.data.length ? res.data.map(d => new FacilityType().build(d)) : [];
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

  public loadOne(id: number): Promise<FacilityType> {
    return new Promise((resolve, reject) => {
      this.dataService.facilityTypesOne(id).subscribe(res => {
        if (res.statusCode === 200) {
          if (res.data) {
            const x: FacilityType = new FacilityType().build(res.data);
            resolve(x);
          } else {
            reject('Object not found');
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
      this.dataService.facilityTypesDelete(id).subscribe(res => {
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
      this.dataService.facilityTypesDeleteBulk(ids).subscribe(res => {
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

  public create(x: FacilityType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.facilityTypesCreate(x).subscribe(res => {
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

  public update(x: FacilityType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.facilityTypesUpdate(x).subscribe(res => {
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
