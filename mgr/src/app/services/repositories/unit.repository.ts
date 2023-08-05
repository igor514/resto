import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { IGetAll } from '../../model/dto/getall.interface';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';
import {Unit} from "../../model/orm/unit.model";

@Injectable()
export class UnitRepository extends Repository<Unit> {
  public schema: string = "unit";
  public schemaMl: string = "unitTranslation";
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
      this.dataService.unitsAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlAll = res.data.length ? res.data.map(d => new Unit().build(d)) : [];
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
      this.dataService.unitsChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlChunk = res.data.length ? res.data.map(d => new Unit().build(d)) : [];
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

  public loadOne(id: number): Promise<Unit> {
    return new Promise((resolve, reject) => {
      this.dataService.unitsOne(id).subscribe(res => {
        if (res.statusCode === 200) {
          if (res.data) {
            const x: Unit = new Unit().build(res.data);
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
      this.dataService.unitsDelete(id).subscribe(res => {
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
      this.dataService.unitsDeleteBulk(ids).subscribe(res => {
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

  public create(x: Unit): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.unitsCreate(x).subscribe(res => {
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

  public update(x: Unit): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.unitsUpdate(x).subscribe(res => {
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
