import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';
import { FacilityType } from 'src/app/model/orm/facility.type.model';
import {FacilityTypeRepository} from "../../../services/repositories/facility.type.repository";

@Component({
	selector: 'facility-types-list-page',
	templateUrl: './facility.types.list.page.html',
})
export class FacilityTypesListPage extends ListPage<FacilityType> implements OnInit {
    public homeUrl: string = "/restaurants/facility-types";
    public selectedLang: Lang = null;

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected facilityTypeRepository: FacilityTypeRepository,
        protected langRepository: LangRepository,
        protected appService: AppService,
    ) {
        super(admlangRepository, facilityTypeRepository, appService);
    }

    get ll(): Lang[] {return this.langRepository.xlAll;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.facilityTypeRepository.loadChunk();
            await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[facility.types] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
