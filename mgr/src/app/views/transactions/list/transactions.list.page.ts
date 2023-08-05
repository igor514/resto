import { Component, OnInit } from '@angular/core';

import { AppService } from '../../../services/app.service';
import { ListPage } from '../../_list.page';
import { AdmLangRepository } from '../../../services/repositories/admlang.repository';
import { TransactionRepository } from '../../../services/repositories/transaction.repository';
import { Transaction } from '../../../model/orm/transaction.model';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'transactions-list-page',
	templateUrl: './transactions.list.page.html',	
})
export class TransactionsListPage extends ListPage<Transaction> implements OnInit {    
    public homeUrl: string = "/restaurants/transactions";    

    constructor(
        protected admlangRepository: AdmLangRepository,
        protected transactionRepository: TransactionRepository,     
        protected restaurantRepository: RestaurantRepository,
        protected appService: AppService,        
    ) {      
        super(admlangRepository, transactionRepository, appService);
    }   
    
    get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
    get filterRestaurantId(): number {return this.transactionRepository.filterRestaurantId;}
    set filterRestaurantId(v: number) {this.transactionRepository.filterRestaurantId = v;}
    
    public async ngOnInit(): Promise<void> {
        try {
            await this.transactionRepository.loadChunk();             
            await this.restaurantRepository.loadAll();   
            this.appService.monitorLog("[transactions] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
