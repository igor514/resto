import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mailtemplate } from 'src/app/model/orm/mailtemplate.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { MailtemplateRepository } from 'src/app/services/repositories/mailtemplate.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'mailtemplates-edit-page',
	templateUrl: './mailtemplates.edit.page.html',	
})
export class MailtemplatesEditPage extends ObjectPage<Mailtemplate> implements OnInit {
	public x: Mailtemplate | null = null;
	public homeUrl: string = "/utils/mailtemplates";	
	public requiredFields: string[] = ["name"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected mailtemplateRepository: MailtemplateRepository,			
		protected langRepository: LangRepository,		
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, mailtemplateRepository, appService, router);
	}	
	
	get ll(): Lang[] {return this.langRepository.xlAll;}	

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.mailtemplateRepository.loadOne(parseInt(p["id"]));				
				await this.langRepository.loadAll();							
				this.appService.monitorLog("[mailtemplates edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
