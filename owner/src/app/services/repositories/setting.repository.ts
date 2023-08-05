import { Injectable } from '@angular/core';

import { Settings } from 'src/app/model/orm/settings.type';
import { DataService } from '../data.service';

@Injectable()
export class SettingRepository {
    public settings: Settings;
    
    constructor(protected dataService: DataService) {}
    
    public loadAll(): Promise<void> {
        return new Promise((resolve, reject) => {            
            this.dataService.settingsAll().subscribe(res => {                    
                if (res.statusCode === 200) {                    
                    this.settings = res.data;
                    resolve();
                } else {                        
                    reject(res.statusCode+": "+res.error);
                }
            }, err => {
                reject(err.message);
            });
        });
    }    
}
