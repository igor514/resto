import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { CatRepository } from '../../../services/repositories/cat.repository';
import { Cat } from '../../../model/orm/cat.model';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'cats-list-page',
	templateUrl: './cats.list.page.html',	
})
export class CatsListPage extends ListPage<Cat> implements OnInit {    
    public homeUrl: string = "/restaurants/cats";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected catRepository: CatRepository,     
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, catRepository, appService);
    }   
    
    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get filterRestaurantId(): number {return this.catRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.catRepository.filterRestaurantId = v;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.catRepository.loadChunk();             
            await this.restaurantRepository.loadAll();   
            this.appService.monitorLog("[cats] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
