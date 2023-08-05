import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lang } from 'src/app/model/orm/lang.model';
import { Wordbook } from 'src/app/model/orm/wordbook.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { WordbookRepository } from 'src/app/services/repositories/wordbook.repository';
import { ObjectPage } from '../../_object.page';


@Component({
	selector: 'wordbooks-edit-page',
	templateUrl: './wordbooks.edit.page.html',	
})
export class WordbooksEditPage extends ObjectPage<Wordbook> implements OnInit {
	public x: Wordbook | null = null;
	public homeUrl: string = "/localization/wordbooks";		

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected wordbookRepository: WordbookRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, wordbookRepository, appService, router);
	}

	get ll(): Lang[] {return this.langRepository.xlAll;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {				
				this.x = await this.wordbookRepository.loadOne(parseInt(p["id"]));
				await this.langRepository.loadAll();
				this.appService.monitorLog("[wordbooks edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
