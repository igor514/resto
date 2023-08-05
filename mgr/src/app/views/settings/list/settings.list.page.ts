import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { Setting } from 'src/app/model/orm/setting.model';
import { SettingRepository } from 'src/app/services/repositories/setting.repository';

@Component({
	selector: 'settings-list-page',
	templateUrl: './settings.list.page.html',	
})
export class SettingsListPage extends ListPage<Setting> implements OnInit {
    // inherited
    public homeUrl: string = "/settings";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected settingRepository: SettingRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, settingRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.settingRepository.loadChunk();
            this.appService.monitorLog("[settings] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
