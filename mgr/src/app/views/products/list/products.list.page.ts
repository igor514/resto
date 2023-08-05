import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { ProductRepository } from '../../../services/repositories/product.repository';
import { Product } from '../../../model/orm/product.model';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { Cat } from 'src/app/model/orm/cat.model';

@Component({
	selector: 'products-list-page',
	templateUrl: './products.list.page.html',	
})
export class ProductsListPage extends ListPage<Product> implements OnInit {    
    public homeUrl: string = "/restaurants/products";      

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected productRepository: ProductRepository,     
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, productRepository, appService);
    }   
    
    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get cl(): Cat[] {return this.rl.find(r => r.id === this.filterRestaurantId)?.cats || [];}
    get filterCatId(): number {return this.productRepository.filterCatId;}
    set filterCatId(v: number) {this.productRepository.filterCatId = v;}
    get filterRestaurantId(): number {return this.productRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.productRepository.filterRestaurantId = v;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.productRepository.loadChunk();             
            await this.restaurantRepository.loadAllWithCats();   
            this.appService.monitorLog("[products] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
