import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { ServingRepository } from '../../../services/repositories/serving.repository';
import { Serving } from '../../../model/orm/serving.model';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';

@Component({
	selector: 'servings-list-page',
	templateUrl: './servings.list.page.html',	
})
export class ServingsListPage extends ListPage<Serving> implements OnInit {    
    public homeUrl: string = "/restaurants/servings";    
    public selectedLang: Lang = null;
    
    constructor(
        protected admlangRepository: AdmLangRepository,
        protected servingRepository: ServingRepository,  
        protected langRepository: LangRepository,   
        protected appService: AppService,        
    ) {      
        super(admlangRepository, servingRepository, appService);
    }    

    get ll(): Lang[] {return this.langRepository.xlAll;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.servingRepository.loadChunk();     
            await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];           
            this.appService.monitorLog("[servings] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
