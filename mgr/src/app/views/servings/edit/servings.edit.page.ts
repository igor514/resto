import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Serving } from 'src/app/model/orm/serving.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { ServingRepository } from 'src/app/services/repositories/serving.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'servings-edit-page',
	templateUrl: './servings.edit.page.html',	
})
export class ServingsEditPage extends ObjectPage<Serving> implements OnInit {
	public x: Serving | null = null;
	public homeUrl: string = "/restaurants/servings";	
	public requiredFields: string[] = ["name"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected servingRepository: ServingRepository,			
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, servingRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.servingRepository.loadOne(parseInt(p["id"]));				
				await this.langRepository.loadAll();							
				this.appService.monitorLog("[servings edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
