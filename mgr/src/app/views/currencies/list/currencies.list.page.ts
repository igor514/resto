import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { CurrencyRepository } from '../../../services/repositories/currency.repository';
import { Currency } from '../../../model/orm/currency.model';

@Component({
	selector: 'currencies-list-page',
	templateUrl: './currencies.list.page.html',	
})
export class CurrenciesListPage extends ListPage<Currency> implements OnInit {    
    public homeUrl: string = "/localization/currencies";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected currencyRepository: CurrencyRepository,             
        protected appService: AppService,        
    ) {      
        super(admlangRepository, currencyRepository, appService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            await this.currencyRepository.loadChunk();                
            this.appService.monitorLog("[currencies] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
