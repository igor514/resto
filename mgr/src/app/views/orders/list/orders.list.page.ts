import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { OrderRepository } from '../../../services/repositories/order.repository';
import { Order } from '../../../model/orm/order.model';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'orders-list-page',
	templateUrl: './orders.list.page.html',	
})
export class OrdersListPage extends ListPage<Order> implements OnInit {    
    public homeUrl: string = "/restaurants/orders";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected orderRepository: OrderRepository,     
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, orderRepository, appService);
    }   
    
    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get filterRestaurantId(): number {return this.orderRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.orderRepository.filterRestaurantId = v;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.orderRepository.loadChunk();             
            await this.restaurantRepository.loadAll();   
            this.appService.monitorLog("[orders] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
