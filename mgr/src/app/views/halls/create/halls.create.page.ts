import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hall } from 'src/app/model/orm/hall.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { HallRepository } from 'src/app/services/repositories/hall.repository';
import { ObjectPage } from '../../_object.page';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'halls-create-page',
	templateUrl: './halls.create.page.html',	
})
export class HallsCreatePage extends ObjectPage<Hall> implements OnInit {
	public x: Hall = null;
	public homeUrl: string = "/restaurants/halls";	
	public requiredFields: string[] = ["name"];		

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected hallRepository: HallRepository,		
		protected restaurantRepository: RestaurantRepository,
		protected appService: AppService,		
		protected router: Router,		
	) {
		super(admlangRepository, hallRepository, appService, router);
	}	
	
	get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}		
	
	public async ngOnInit(): Promise<void> {
		try {
			await this.restaurantRepository.loadAll();			
			this.x = new Hall().init();				
			this.appService.monitorLog("[halls create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}
}
