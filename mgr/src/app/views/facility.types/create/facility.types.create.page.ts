import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacilityType } from 'src/app/model/orm/facility.type.model';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { FacilityTypeRepository } from 'src/app/services/repositories/facility.type.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';

@Component({
	selector: 'facility-types-create-page',
	templateUrl: './facility.types.create.page.html',
})
export class FacilityTypesCreatePage extends ObjectPage<FacilityType> implements OnInit {
	public x: FacilityType | null = null;
	public homeUrl: string = "/restaurants/facility-types";
	public requiredFields: string[] = ["name", "priority"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected facilityTypeRepository: FacilityTypeRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
	) {
		super(admlangRepository, facilityTypeRepository, appService, router);
	}

	get ll(): Lang[] {return this.langRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {
			await this.langRepository.loadAll();
			this.x = new FacilityType().init(this.ll);
			this.appService.monitorLog("[facility.types create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}
}
