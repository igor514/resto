import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Currency } from 'src/app/model/orm/currency.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { CurrencyRepository } from 'src/app/services/repositories/currency.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'currencies-create-page',
	templateUrl: './currencies.create.page.html',	
})
export class CurrenciesCreatePage extends ObjectPage<Currency> implements OnInit {
	public x: Currency | null = null;
	public homeUrl: string = "/localization/currencies";		
	public requiredFields: string[] = ["name"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected currencyRepository: CurrencyRepository,				
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, currencyRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {	
			this.x = new Currency().init();			
			this.appService.monitorLog("[currencies create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
