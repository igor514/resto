import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {Repository2} from './_repository2';
import {IGetAll} from 'src/app/model/dto/getall.interface';
import {IngredientType} from "../../model/orm/ingredient.type.model";
import {IChunk} from "../../model/chunk.interface";
import {IGetChunk} from "../../model/dto/getchunk.interface";

@Injectable()
export class IngredientTypeRepository extends Repository2 {
  public filterName: string = "";

  constructor(protected dataService: DataService) {
    super(dataService);
    this.schema = "ingredientType";
  }

  public loadByRestaurant(restaurant_id: number): Promise<IngredientType[]> {
    return this.loadAll("id", 1, {restaurant_id});
  }
  public loadAll(sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<IngredientType[]> {
    return new Promise((resolve, reject) => {
      if (this.filterName) {
        filter.name = this.filterName
      }
      const dto: IGetAll = {sortBy, sortDir, filter};
      this.dataService.ingredientTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data.map(i => new IngredientType().build(i)));
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public loadChunk(part: number, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<IChunk<IngredientType>> {
    return new Promise((resolve, reject) => {
      const dto: IGetChunk = {from: part * this.chunkLength, q: this.chunkLength, sortBy, sortDir, filter};
      this.dataService.ingredientTypesChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          const chunk: IChunk<IngredientType> = {
            data: res.data.map(d => new IngredientType().build(d)),
            allLength: res.allLength
          };
          resolve(chunk);
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public one(id: number): Promise<IngredientType> {
    return new Promise((resolve, reject) => this.dataService.ingredientTypesOne(id)
      .subscribe(res => res.statusCode === 200 ? resolve(new IngredientType().build(res.data)) : reject(res.error), err => reject(err.message)));
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => this.dataService.ingredientTypesDelete(id)
      .subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
  }

  public create(x: IngredientType): Promise<void> {
    return new Promise((resolve, reject) => this.dataService.ingredientTypesCreate(x)
      .subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
  }

  public update(x: IngredientType): Promise<void> {
    return new Promise((resolve, reject) => this.dataService.ingredientTypesUpdate(x)
      .subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
  }
}
