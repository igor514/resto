import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { ObjectPage } from '../../_object.page';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import {FloorRepository} from '../../../services/repositories/floor.repository';
import {Floor} from '../../../model/orm/floor.model';

@Component({
	selector: 'floors-create-page',
	templateUrl: './floors.create.page.html',
})
export class FloorsCreatePage extends ObjectPage<Floor> implements OnInit {
	public x: Floor = null;
	public homeUrl = '/restaurants/floors';
	public requiredFields: string[] = ['number'];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected floorRepository: FloorRepository,
		protected restaurantRepository: RestaurantRepository,
		protected appService: AppService,
		protected router: Router,
	) {
		super(admlangRepository, floorRepository, appService, router);
	}

	get rl(): Restaurant[] {return this.restaurantRepository.xlAll; }

	public async ngOnInit(): Promise<void> {
		try {
			await this.restaurantRepository.loadAll();
			this.x = new Floor().init();
			this.appService.monitorLog('[floors create] page loaded');
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}
}
