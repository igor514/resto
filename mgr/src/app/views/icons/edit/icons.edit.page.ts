import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icon } from 'src/app/model/orm/icon.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { IconRepository } from 'src/app/services/repositories/icon.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'icons-edit-page',
	templateUrl: './icons.edit.page.html',	
})
export class IconsEditPage extends ObjectPage<Icon> implements OnInit {
	public x: Icon | null = null;
	public homeUrl: string = "/restaurants/icons";	
	public requiredFields: string[] = ["img"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected iconRepository: IconRepository,			
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, iconRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.iconRepository.loadOne(parseInt(p["id"]));				
				await this.langRepository.loadAll();							
				this.appService.monitorLog("[icons edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
