import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {Repository2} from './_repository2';
import {IGetAll} from 'src/app/model/dto/getall.interface';
import {IChunk} from "../../model/chunk.interface";
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {Unit} from "../../model/orm/unit.model";

@Injectable()
export class UnitRepository extends Repository2 {
  public filterName: string = "";

  constructor(protected dataService: DataService) {
    super(dataService);
    this.schema = "units";
  }

  public loadAll(sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<Unit[]> {
    return new Promise((resolve, reject) => {
      if (this.filterName) {
        filter.name = this.filterName
      }
      const dto: IGetAll = {sortBy, sortDir, filter};
      this.dataService.unitsAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data.map(u => new Unit().build(u)));
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public loadChunk(part: number, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<IChunk<Unit>> {
    return new Promise((resolve, reject) => {
      const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
      this.dataService.unitsChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          const chunk: IChunk<Unit> = {data: res.data.map(d => new Unit().build(d)), allLength: res.allLength};
          resolve(chunk);
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public one(id: number): Promise<Unit> {
    return new Promise((resolve, reject) => {
      this.dataService.unitsOne(id)
        .subscribe(res => {
            res.statusCode === 200 ? resolve(new Unit().build(res.data)) : reject(res.error)
          },
          err => reject(err.message))
    });
  }
}
