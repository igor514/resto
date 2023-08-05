import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { WSServer } from 'src/app/model/orm/wsserver.model';
import { WSServerRepository } from 'src/app/services/repositories/wsserver.repository';

@Component({
	selector: 'wsservers-list-page',
	templateUrl: './wsservers.list.page.html',	
})
export class WSServersListPage extends ListPage<WSServer> implements OnInit {    
    public homeUrl: string = "/utils/wsservers";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected wsserverRepository: WSServerRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, wsserverRepository, appService);
    }    
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.wsserverRepository.loadChunk();
            this.appService.monitorLog("[wsservers] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }       
}
