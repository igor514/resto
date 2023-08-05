import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Admin } from '../../model/orm/admin.model';
import { DataService } from '../data.service';
import { IGetChunk } from '../../model/dto/getchunk.interface';

@Injectable()
export class AdminRepository extends Repository<Admin> {
    public schema: string = "admin";    

    constructor(protected dataService: DataService) {
        super(dataService);
    }    

    public loadChunk(): Promise<void> {
        return new Promise((resolve, reject) => {
            const dto: IGetChunk = {
                from: this.chunkCurrentPart * this.chunkLength,
                q: this.chunkLength,
                sortBy: this.chunkSortBy,
                sortDir: this.chunkSortDir,                    
            };
            this.dataService.adminsChunk(dto).subscribe(res => {                
                if (res.statusCode === 200) {                    
                    this.xlChunk = res.data.length ? res.data.map(d => new Admin().build(d)) : [];
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

    public loadOne(id: number): Promise<Admin> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Admin = new Admin().build(res.data);
                        resolve(x);
                    } else {
                        reject("Object not found");
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
            this.dataService.adminsDelete(id).subscribe(res => {
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
            this.dataService.adminsDeleteBulk(ids).subscribe(res => {
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

    public create(x: Admin): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsCreate(x).subscribe(res => {
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

    public update(x: Admin): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.adminsUpdate(x).subscribe(res => {
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
