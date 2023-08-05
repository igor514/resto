import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mailtemplate } from 'src/app/model/orm/mailtemplate.model';
import { Lang } from 'src/app/model/orm/lang.model';

import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { MailtemplateRepository } from 'src/app/services/repositories/mailtemplate.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'mailtemplates-create-page',
	templateUrl: './mailtemplates.create.page.html',	
})
export class MailtemplatesCreatePage extends ObjectPage<Mailtemplate> implements OnInit {
	public x: Mailtemplate | null = null;
	public homeUrl: string = "/utils/mailtemplates";	
	public requiredFields: string[] = ["name"];		

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected mailtemplateRepository: MailtemplateRepository,		
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, mailtemplateRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}		

	public async ngOnInit(): Promise<void> {
		try {
			await this.langRepository.loadAll();			
			this.x = new Mailtemplate().init(this.ll);				
			this.appService.monitorLog("[mailtemplates create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
