import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { MailtemplateRepository } from '../../../services/repositories/mailtemplate.repository';
import { Mailtemplate } from '../../../model/orm/mailtemplate.model';

@Component({
	selector: 'mailtemplates-list-page',
	templateUrl: './mailtemplates.list.page.html',	
})
export class MailtemplatesListPage extends ListPage<Mailtemplate> implements OnInit {    
    public homeUrl: string = "/utils/mailtemplates";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected mailtemplateRepository: MailtemplateRepository,     
        protected appService: AppService,        
    ) {      
        super(admlangRepository, mailtemplateRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.mailtemplateRepository.loadChunk();                
            this.appService.monitorLog("[mailtemplates] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
