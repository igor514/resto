import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { ObjectPage } from '../../_object.page';
import { CurrencyRepository } from 'src/app/services/repositories/currency.repository';
import { Currency } from 'src/app/model/orm/currency.model';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';
import {PaymentService} from "../../../services/payment.service";
import {FeeDto} from "../../../model/dto/fee.dto";

@Component({
	selector: 'restaurants-create-page',
	templateUrl: './restaurants.create.page.html',
})
export class RestaurantsCreatePage extends ObjectPage<Restaurant> implements OnInit {
	public x: Restaurant = null;
	public homeUrl: string = "/restaurants/restaurants";
	public requiredFields: string[] = ["name"];
  public fees: FeeDto[];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected restaurantRepository: RestaurantRepository,
		protected currencyRepository: CurrencyRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
    protected paymentService: PaymentService,
		protected router: Router,
	) {
		super(admlangRepository, restaurantRepository, appService, router);
	}

	get cl(): Currency[] {return this.currencyRepository.xlAll;}
	get ll(): Lang[] {return this.langRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {
			await this.currencyRepository.loadAll();
			await this.langRepository.loadAll();
      const types = await this.paymentService.paymentTypes().toPromise()
      this.fees = (await this.paymentService.balanceFees().toPromise()).data
			this.x = new Restaurant().init(types.data);
			this.appService.monitorLog("[restaurants create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}
}
