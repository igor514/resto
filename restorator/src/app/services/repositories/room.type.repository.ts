import {Injectable} from "@angular/core";
import {Repository2} from "./_repository2";
import {DataService} from "../data.service";
import {Employee} from "../../model/orm/employee.model";
import {IGetAll} from "../../model/dto/getall.interface";
import {RoomType} from "../../model/orm/room.type.model";

@Injectable()
export class RoomTypeRepository extends Repository2 {
  constructor(protected dataService: DataService) {
    super(dataService);
  }

  public loadAll(sortBy: string = 'id', sortDir: number = 1): Promise<RoomType[]> {
    return new Promise((resolve, reject) => {
      const dto: IGetAll = {sortDir, sortBy};
      this.dataService.roomTypesAll(dto).subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data.map(d => new RoomType().build(d)));
        } else {
          reject(res.error);
        }
      }, err => {
        reject(err.message);
      });
    });
  }
}
