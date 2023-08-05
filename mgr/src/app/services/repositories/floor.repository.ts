import {Injectable} from '@angular/core';

import {Repository} from './_repository';
import {IGetChunk} from '../../model/dto/getchunk.interface';
import {DataService} from '../data.service';
import {IGetAll} from 'src/app/model/dto/getall.interface';
import {Floor} from '../../model/orm/floor.model';

@Injectable()
export class FloorRepository extends Repository<Floor> {
  public schema = 'floor';
  public allSortBy = 'number';
  public chunkSortBy = 'number';
  public filterRestaurantId: number = null;

  constructor(protected dataService: DataService) {
    super(dataService);
  }

  public loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {
        sortBy: this.allSortBy,
        sortDir: this.allSortDir,
      };
      this.dataService.floorsAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlAll = res.data.length ? res.data.map(d => new Floor().build(d)) : [];
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
      const filter: any = {};
      this.filterRestaurantId ? filter.restaurant_id = this.filterRestaurantId : null;
      const dto: IGetChunk = {
        from: this.chunkCurrentPart * this.chunkLength,
        q: this.chunkLength,
        sortBy: this.chunkSortBy,
        sortDir: this.chunkSortDir,
        filter,
      };
      this.dataService.floorsChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlChunk = res.data.length ? res.data.map(d => new Floor().build(d)) : [];
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

  public loadOne(id: number): Promise<Floor> {
    return new Promise((resolve, reject) => {
      this.dataService.floorsOne(id).subscribe(res => {
        if (res.statusCode === 200) {
          if (res.data) {
            const x: Floor = new Floor().build(res.data);
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
      this.dataService.floorsDelete(id).subscribe(res => {
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
      this.dataService.floorsDeleteBulk(ids).subscribe(res => {
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

  public create(x: Floor): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.floorsCreate(x).subscribe(res => {
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

  public update(x: Floor): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.floorsUpdate(x).subscribe(res => {
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
