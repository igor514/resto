import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lang } from 'src/app/model/orm/lang.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { ObjectPage } from '../../_object.page';
import {UnitRepository} from "../../../services/repositories/unit.repository";
import {Unit} from "../../../model/orm/unit.model";

@Component({
	selector: 'units-create-page',
	templateUrl: './units.create.page.html',
})
export class UnitsCreatePage extends ObjectPage<Unit> implements OnInit {
	public x: Unit | null = null;
	public homeUrl: string = "/restaurants/units";
  public requiredFields: string[] = ["name", "short"];
  public units: Unit[] = [];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected unitRepository: UnitRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
	) {
		super(admlangRepository, unitRepository, appService, router);
	}

	get ll(): Lang[] {return this.langRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {
			await this.langRepository.loadAll();
      await this.unitRepository.loadAll();
      this.units = this.unitRepository.xlAll
			this.x = new Unit().init(this.ll);
			this.appService.monitorLog("[unit create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}
}
