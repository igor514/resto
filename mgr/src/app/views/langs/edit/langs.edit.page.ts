import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';


@Component({
	selector: 'langs-edit-page',
	templateUrl: './langs.edit.page.html',	
})
export class LangsEditPage extends ObjectPage<Lang> implements OnInit {
	public x: Lang | null = null;
	public homeUrl: string = "/localization/langs";
	public imgFolder: string = "langs";
	public imgDisk: string = "langs";
	public requiredFields: string[] = ["slug"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, langRepository, appService, router);
	}


	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {				
				this.x = await this.langRepository.loadOne(parseInt(p["id"]));
				this.appService.monitorLog("[langs edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
