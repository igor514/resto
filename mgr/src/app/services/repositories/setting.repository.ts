import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Setting } from '../../model/orm/setting.model';
import { DataService } from '../data.service';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { IGetAll } from 'src/app/model/dto/getall.interface';

@Injectable()
export class SettingRepository extends Repository<Setting> {
    public schema: string = "setting";
    public chunkSortBy: string = "pos";
    public allSortBy: string = "pos";

    constructor(
        protected dataService: DataService,
    ) {
        super(dataService);
    } 
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            const dto: IGetAll = {
                sortBy: this.allSortBy,
                sortDir: this.allSortDir,                    
            };
            this.dataService.settingsAll(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlAll = res.data.length ? res.data.map(d => new Setting().build(d)) : [];                                    
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
            this.dataService.settingsChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {
                    this.xlChunk = res.data.length ? res.data.map(d => new Setting().build(d)) : [];
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
    
    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.settingsDelete(id).subscribe(res => {
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
            this.dataService.settingsDeleteBulk(ids).subscribe(res => {
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

    public create(x: Setting): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.settingsCreate(x).subscribe(res => {
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
