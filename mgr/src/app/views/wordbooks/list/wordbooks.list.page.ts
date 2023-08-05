import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { WordbookRepository } from '../../../services/repositories/wordbook.repository';
import { Wordbook } from '../../../model/orm/wordbook.model';

@Component({
	selector: 'wordbooks-list-page',
	templateUrl: './wordbooks.list.page.html',	
})
export class WordbooksListPage extends ListPage<Wordbook> implements OnInit {
    // inherited
    public homeUrl: string = "/localization/wordbooks";

    constructor(
        protected admwordbookRepository: AdmLangRepository,
        protected wordbookRepository: WordbookRepository,         
        protected appService: AppService,        
    ) {      
        super(admwordbookRepository, wordbookRepository, appService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            await this.wordbookRepository.loadChunk();                
            this.appService.monitorLog("[wordbooks] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
