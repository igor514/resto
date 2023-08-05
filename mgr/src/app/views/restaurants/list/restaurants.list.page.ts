import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { RestaurantRepository } from '../../../services/repositories/restaurant.repository';
import { Restaurant } from '../../../model/orm/restaurant.model';
import {FacilityTypeRepository} from "../../../services/repositories/facility.type.repository";
import {FacilityType} from "../../../model/orm/facility.type.model";
import {LangRepository} from "../../../services/repositories/lang.repository";

@Component({
	selector: 'restaurants-list-page',
	templateUrl: './restaurants.list.page.html',
})
export class RestaurantsListPage extends ListPage<Restaurant> implements OnInit {
    public homeUrl: string = "/restaurants/restaurants";
    public typeFilter: number = -1;

    public readonly ALL_TYPE = -1; // don't filter by type
    public readonly REST_TYPE = null; // type not selected i.e. has default restaurant type

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected restaurantRepository: RestaurantRepository,
        protected facilityTypeRepository: FacilityTypeRepository,
        protected langRepository: LangRepository,
        protected appService: AppService,
    ) {
        super(admlangRepository, restaurantRepository, appService);
    }

    get types(): FacilityType[] {
      return this.facilityTypeRepository.xlAll
    }

    translate(t: FacilityType): string {
      const langId = this.langRepository.xlAll.find(x => x.slug === this.admlangRepository.currentLang.name).id
      return t.translationByLang(langId).name
    }

    public async ngOnInit(): Promise<void> {
        try {
            await this.restaurantRepository.loadChunk();
            await this.langRepository.loadAll();
            await this.facilityTypeRepository.loadAll();
            this.appService.monitorLog("[restaurants] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    public setTypeFilter(filter: number) {
      this.typeFilter = filter
      this.restaurantRepository.filterTypeId = filter
      this.rebuildList()
    }
}
