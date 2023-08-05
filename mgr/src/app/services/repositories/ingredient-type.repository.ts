import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {IGetAll} from 'src/app/model/dto/getall.interface';
import {IngredientType} from "../../model/orm/ingredient.type.model";
import {IGetChunk} from "../../model/dto/getchunk.interface";
import {Repository} from "./_repository";

@Injectable()
export class IngredientTypeRepository extends Repository<IngredientType> {
  public schema = "ingredientType";
  public allSortBy = "name";
  public chunkSortBy = "name";
  public filterRestaurantId: number = null;

  constructor(protected dataService: DataService) {
    super(dataService);
  }

  public loadByRestaurant(restaurant_id: number): Promise<IngredientType[]> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {
        sortBy: this.allSortBy,
        sortDir: this.allSortDir,
        filter: {restaurant_id}
      };
      this.dataService.ingredientTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data.length ? res.data.map(d => new IngredientType().build(d)) : []);
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }

  public loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {
        sortBy: this.allSortBy,
        sortDir: this.allSortDir,
      };
      this.dataService.ingredientTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlAll = res.data.length ? res.data.map(d => new IngredientType().build(d)) : [];
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
      this.dataService.ingredientTypesChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlChunk = res.data.length ? res.data.map(d => new IngredientType().build(d)) : [];
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

  public loadOne(id: number): Promise<IngredientType> {
    return new Promise((resolve, reject) => this.dataService.ingredientTypesOne(id)
      .subscribe(res => res.statusCode === 200 ? resolve(new IngredientType().build(res.data)) : reject(res.error), err => reject(err.message)));
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => this.dataService.ingredientTypesDelete(id)
      .subscribe(res => res.statusCode === 200 ? resolve() : reject(res.error), err => reject(err.message)));
  }

  public create(x: IngredientType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.ingredientTypesCreate(x).subscribe(res => {
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

  public update(x: IngredientType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dataService.ingredientTypesUpdate(x).subscribe(res => {
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
