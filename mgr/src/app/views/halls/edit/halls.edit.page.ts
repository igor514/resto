import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hall } from 'src/app/model/orm/hall.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { HallRepository } from 'src/app/services/repositories/hall.repository';
import { ObjectPage } from '../../_object.page';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';

@Component({
	selector: 'halls-edit-page',
	templateUrl: './halls.edit.page.html',	
})
export class HallsEditPage extends ObjectPage<Hall> implements OnInit {
	public x: Hall = null;
	public homeUrl: string = "/restaurants/halls";	
	public requiredFields: string[] = ["name"];		
	
	constructor(
		protected admlangRepository: AdmLangRepository,
		protected hallRepository: HallRepository,			
		protected restaurantRepository: RestaurantRepository,
		protected appService: AppService,		
		protected router: Router,
		private route: ActivatedRoute,	
	) {
		super(admlangRepository, hallRepository, appService, router);
	}	
	
	get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}		
	
	public ngOnInit(): void {
		this.route.params.subscribe(async p => {			
			try {
				this.x = await this.hallRepository.loadOne(parseInt(p["id"]));				
				await this.restaurantRepository.loadAll();			
				this.appService.monitorLog("[halls edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}			
		});
	}	
}
