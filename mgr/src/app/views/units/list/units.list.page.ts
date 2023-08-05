import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';
import {UnitRepository} from "../../../services/repositories/unit.repository";
import {Unit} from "../../../model/orm/unit.model";

@Component({
	selector: 'units-list-page',
	templateUrl: 'units.list.page.html',
  styleUrls: ['units.list.page.scss']
})
export class UnitsListPage extends ListPage<Unit> implements OnInit {
    public homeUrl: string = "/restaurants/units";
    public selectedLang: Lang = null;
    public units: Unit[] = [];

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected unitRepository: UnitRepository,
        protected langRepository: LangRepository,
        protected appService: AppService,
    ) {
        super(admlangRepository, unitRepository, appService);
    }

    get ll(): Lang[] {return this.langRepository.xlAll;}

    relatedOptions(unit_id: number): Unit[] {
      return this.units.filter(u => u.id !== unit_id)
    }

    public async ngOnInit(): Promise<void> {
        try {
            await this.unitRepository.loadChunk();
            await this.unitRepository.loadAll();
            this.units = this.unitRepository.xlAll;
            await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[units] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
