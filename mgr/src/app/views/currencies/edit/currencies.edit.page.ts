import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from 'src/app/model/orm/currency.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { CurrencyRepository } from 'src/app/services/repositories/currency.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'currencies-edit-page',
	templateUrl: './currencies.edit.page.html',	
})
export class CurrenciesEditPage extends ObjectPage<Currency> implements OnInit {
	public x: Currency | null = null;
	public homeUrl: string = "/localization/currencies";	
	public requiredFields: string[] = ["name"];	
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected currencyRepository: CurrencyRepository,					
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, currencyRepository, appService, router);
	}		

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.currencyRepository.loadOne(parseInt(p["id"]));					
				this.appService.monitorLog("[currencies edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
