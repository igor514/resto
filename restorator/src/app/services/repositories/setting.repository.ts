import { Injectable } from '@angular/core';

import { Settings } from 'src/app/model/orm/settings.type';
import { DataService } from '../data.service';

@Injectable()
export class SettingRepository {
    public settings: Settings = null;
    private interval: number = null;
    
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

    public startReload(): void {
        this.interval = window.setInterval(() => this.loadAll(), 15 * 1000);
    }
}
