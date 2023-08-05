import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Serving } from 'src/app/model/orm/serving.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { ServingRepository } from 'src/app/services/repositories/serving.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'servings-create-page',
	templateUrl: './servings.create.page.html',	
})
export class ServingsCreatePage extends ObjectPage<Serving> implements OnInit {
	public x: Serving | null = null;
	public homeUrl: string = "/restaurants/servings";	
	public requiredFields: string[] = ["name"];		

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected servingRepository: ServingRepository,		
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, servingRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}		

	public async ngOnInit(): Promise<void> {
		try {
			await this.langRepository.loadAll();			
			this.x = new Serving().init(this.ll);				
			this.appService.monitorLog("[servings create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
