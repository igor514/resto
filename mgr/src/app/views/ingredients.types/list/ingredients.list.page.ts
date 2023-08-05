import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import {IngredientTypeRepository} from "../../../services/repositories/ingredient-type.repository";
import {IngredientType} from "../../../model/orm/ingredient.type.model";
import {LangRepository} from "../../../services/repositories/lang.repository";

@Component({
	selector: 'ingredients-list-page',
	templateUrl: './ingredients.list.page.html',
})
export class IngredientsListPage extends ListPage<IngredientType> implements OnInit {
    public homeUrl: string = "/restaurants/ingredients";

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected ingRepository: IngredientTypeRepository,
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,
        protected langRepository: LangRepository,
    ) {
        super(admlangRepository, ingRepository, appService);
    }

  get langId(): number {
    return this.langRepository.xlAll.find(x => x.slug === this.admlangRepository.currentLang.name).id
  }

    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get filterRestaurantId(): number {return this.ingRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.ingRepository.filterRestaurantId = v;}

    public async ngOnInit(): Promise<void> {
        try {
            await this.langRepository.loadAll()
            await this.ingRepository.loadChunk();
            await this.restaurantRepository.loadAll();
            this.appService.monitorLog("[ingredients] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
