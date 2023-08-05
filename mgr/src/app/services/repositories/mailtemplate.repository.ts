import { Injectable } from '@angular/core';

import { Repository } from './_repository';
import { Mailtemplate } from '../../model/orm/mailtemplate.model';
import { IGetChunk } from '../../model/dto/getchunk.interface';
import { DataService } from '../data.service';

@Injectable()
export class MailtemplateRepository extends Repository<Mailtemplate> {
    public schema: string = "mailtemplate";        
    public chunkSortBy: string = "name";    
    
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
            this.dataService.mailtemplatesChunk(dto).subscribe(res => {
                if (res.statusCode === 200) {                                        
                    this.xlChunk = res.data.length ? res.data.map(d => new Mailtemplate().build(d)) : [];
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

    public loadOne(id: number): Promise<Mailtemplate> {
        return new Promise((resolve, reject) => {
            this.dataService.mailtemplatesOne(id).subscribe(res => {
                if (res.statusCode === 200) {
                    if (res.data) {
                        let x: Mailtemplate = new Mailtemplate().build(res.data);
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
            this.dataService.mailtemplatesDelete(id).subscribe(res => {
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
            this.dataService.mailtemplatesDeleteBulk(ids).subscribe(res => {
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

    public create(x: Mailtemplate): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.mailtemplatesCreate(x).subscribe(res => {
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

    public update(x: Mailtemplate): Promise<void> {
        return new Promise((resolve, reject) => {
            this.dataService.mailtemplatesUpdate(x).subscribe(res => {
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
