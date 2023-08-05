import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lang } from 'src/app/model/orm/lang.model';

import { Wordbook } from 'src/app/model/orm/wordbook.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { WordbookRepository } from 'src/app/services/repositories/wordbook.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'wordbooks-create-page',
	templateUrl: './wordbooks.create.page.html',	
})
export class WordbooksCreatePage extends ObjectPage<Wordbook> implements OnInit {
	public x: Wordbook | null = null;
	public homeUrl: string = "/localization/wordbooks";
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected wordbookRepository: WordbookRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, wordbookRepository, appService, router);
	}

	get ll(): Lang[] {return this.langRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {
			this.x = new Wordbook().init();
			await this.langRepository.loadAll();
			this.appService.monitorLog("[wordbooks create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
