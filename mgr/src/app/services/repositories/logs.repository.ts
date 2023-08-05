import {Injectable} from '@angular/core';

import {Repository} from './_repository';
import {IGetChunk} from '../../model/dto/getchunk.interface';
import {DataService} from '../data.service';
import {Log} from "../../model/orm/log.model";
import {Admin} from "../../model/orm/admin.model";
import {Employee} from "../../model/orm/employee.model";

@Injectable()
export class LogRepository extends Repository<Log> {
  public schema: string = "logs";
  public chunkSortBy: string = "created_at";
  public chunkSortDir: number = -1;
  public filterAdminId: number = null;
  public filterEmployeeId: number = null;

  constructor(protected dataService: DataService) {
    super(dataService);
  }

  public loadChunk(): Promise<void> {
    return new Promise((resolve, reject) => {
      let filter: any = {};
      this.filterAdminId ? filter.admin_id = this.filterAdminId : null;
      this.filterEmployeeId ? filter.employee_id = this.filterEmployeeId : null;
      const dto: IGetChunk = {
        from: this.chunkCurrentPart * this.chunkLength,
        q: this.chunkLength,
        sortBy: this.chunkSortBy,
        sortDir: this.chunkSortDir,
        filter,
      };
      this.dataService.logsChunk(dto).subscribe(res => {
        if (res.statusCode === 200) {
          this.xlChunk = res.data.length ? res.data.map(d => new Log().build(d)) : [];
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

  public async admins(): Promise<Pick<Admin, 'id' | 'name'>[]> {
    return new Promise((resolve, rej) => {
      this.dataService.logsAdmins().subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          rej(res.error)
        }
      }, err => rej(err.message))
    })
  }

  public async employees(): Promise<Pick<Employee, 'id' | 'name'>[]> {
    return new Promise((resolve, rej) => {
      this.dataService.logsEmployees().subscribe(res => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          rej(res.error)
        }
      }, err => rej(err.message))
    })
  }
}
