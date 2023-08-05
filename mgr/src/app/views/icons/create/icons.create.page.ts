import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from 'src/app/model/orm/icon.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { IconRepository } from 'src/app/services/repositories/icon.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'icons-create-page',
	templateUrl: './icons.create.page.html',	
})
export class IconsCreatePage extends ObjectPage<Icon> implements OnInit {
	public x: Icon | null = null;
	public homeUrl: string = "/restaurants/icons";	
	public requiredFields: string[] = ["img"];		

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected iconRepository: IconRepository,		
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, iconRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}		

	public async ngOnInit(): Promise<void> {
		try {
			await this.langRepository.loadAll();			
			this.x = new Icon().init(this.ll);				
			this.appService.monitorLog("[icons create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
