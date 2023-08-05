import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { RoomType } from '../../model/orm/room.type.model';
import { IGetAll } from '../../model/dto/getall.interface';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class RoomTypeRepository extends Repository<RoomType> {
  public schema: string = "roomType";
  public schemaMl: string = "roomTypeTranslation";
  public allSortBy: string = "priority";
  public chunkSortBy: string = "priority";

  constructor(protected dataService: DataService) {
    super(dataService);
  }
  public loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {
        sortBy: this.allSortBy,
        sortDir: this.allSortDir,
      };
      this.dataService.roomTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlAll = res.data.length ? res.data.map(d => new RoomType().build(d)) : [];
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
      this.dataService.roomTypesChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlChunk = res.data.length ? res.data.map(d => new RoomType().build(d)) : [];
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

  public loadOne(id: number): Promise<RoomType> {
    return new Promise((resolve, reject) => {
      this.dataService.roomTypesOne(id).subscribe(res => {
        if (res.statusCode === 200) {
          if (res.data) {
            const x: RoomType = new RoomType().build(res.data);
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
      this.dataService.roomTypesDelete(id).subscribe(res => {
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
      this.dataService.roomTypesDeleteBulk(ids).subscribe(res => {
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

  public create(x: RoomType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.roomTypesCreate(x).subscribe(res => {
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

  public update(x: RoomType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.roomTypesUpdate(x).subscribe(res => {
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
