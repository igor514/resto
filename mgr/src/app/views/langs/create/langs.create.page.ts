import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'langs-create-page',
	templateUrl: './langs.create.page.html',	
})
export class LangsCreatePage extends ObjectPage<Lang> implements OnInit {
	public x: Lang | null = null;
	public homeUrl: string = "/localization/langs";	
	public requiredFields: string[] = ["slug"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,		
	) {
		super(admlangRepository, langRepository, appService, router);
	}

	public ngOnInit(): void {
		this.x = new Lang().init();
		this.appService.monitorLog("[langs create] page loaded");
		this.ready = true;
	}
}
