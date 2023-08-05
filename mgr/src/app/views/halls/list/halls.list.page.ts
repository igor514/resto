import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { HallRepository } from '../../../services/repositories/hall.repository';
import { Hall } from '../../../model/orm/hall.model';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'halls-list-page',
	templateUrl: './halls.list.page.html',	
})
export class HallsListPage extends ListPage<Hall> implements OnInit {    
    public homeUrl: string = "/restaurants/halls";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected hallRepository: HallRepository,     
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, hallRepository, appService);
    }   
    
    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get filterRestaurantId(): number {return this.hallRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.hallRepository.filterRestaurantId = v;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.hallRepository.loadChunk();             
            await this.restaurantRepository.loadAll();   
            this.appService.monitorLog("[halls] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
