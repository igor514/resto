import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/orm/restaurant.model';
import { AppService } from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import { RestaurantRepository } from 'src/app/services/repositories/restaurant.repository';
import { ObjectPage } from '../../_object.page';
import { CurrencyRepository } from 'src/app/services/repositories/currency.repository';
import { Currency } from 'src/app/model/orm/currency.model';
import { LangRepository } from 'src/app/services/repositories/lang.repository';
import { Lang } from 'src/app/model/orm/lang.model';
import {FeeDto} from "../../../model/dto/fee.dto";
import {PaymentService} from "../../../services/payment.service";

@Component({
	selector: 'restaurants-edit-page',
	templateUrl: './restaurants.edit.page.html',
})
export class RestaurantsEditPage extends ObjectPage<Restaurant> implements OnInit {
	public x: Restaurant = null;
  public fees: FeeDto[] = [];
	public homeUrl: string = "/restaurants/restaurants";
	public requiredFields: string[] = ["name"];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected restaurantRepository: RestaurantRepository,
		protected currencyRepository: CurrencyRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,
    private paymentService: PaymentService
	) {
		super(admlangRepository, restaurantRepository, appService, router);
	}

	get cl(): Currency[] {return this.currencyRepository.xlAll;}
	get ll(): Lang[] {return this.langRepository.xlAll;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.x = await this.restaurantRepository.loadOne(parseInt(p["id"]));
				await this.currencyRepository.loadAll();
				await this.langRepository.loadAll();
        this.fees = (await this.paymentService.balanceFees().toPromise()).data
				this.appService.monitorLog("[restaurants edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}
		});
	}
}
