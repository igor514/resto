import {Injectable} from '@angular/core';
import {IGetChunk} from '../../model/dto/getchunk.interface';
import {DataService} from '../data.service';
import {IGetAll} from 'src/app/model/dto/getall.interface';
import {Repository2} from './_repository2';
import {IChunk} from 'src/app/model/chunk.interface';
import {Floor} from '../../model/orm/floor.model';

@Injectable()
export class FloorRepository extends Repository2 {
  constructor(protected dataService: DataService) {
    super(dataService);
  }

  public loadAll(sortBy: string = "number", sortDir: number = 1, filter: any = {}): Promise<Floor[]> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {sortBy, sortDir, filter};
      this.dataService.floorsAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data.map(d => new Floor().build(d)));
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public loadChunk(part: number, sortBy: string = "number", sortDir: number = 1, filter: any = {}): Promise<IChunk<Floor>> {
    return new Promise((resolve, reject) => {
      const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
      this.dataService.floorsChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          const chunk: IChunk<Floor> = {data: res.data.map(d => new Floor().build(d)), allLength: res.allLength};
          resolve(chunk);
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public loadOne(id: number): Promise<Floor> {
    return new Promise((resolve, reject) => this.dataService.floorsOne(id).subscribe(res => res.statusCode === 200 ? resolve(new Floor().build(res.data)) : reject(res.error), err => reject(err.message)));
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => this.dataService.floorsDelete(id).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
  }

  public create(x: Floor): Promise<void> {
    return new Promise((resolve, reject) => this.dataService.floorsCreate(x).subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
  }

  public update(x: Floor): Promise<Floor> {
    return new Promise((resolve, reject) => this.dataService.floorsUpdate(x).subscribe(res => res.statusCode === 200 ? resolve(res.data) : reject(res.error), err => reject(err.message)));
  }
}
