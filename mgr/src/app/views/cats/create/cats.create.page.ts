import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cat} from 'src/app/model/orm/cat.model';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {CatRepository} from 'src/app/services/repositories/cat.repository';
import {ObjectPage} from '../../_object.page';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {Lang} from 'src/app/model/orm/lang.model';
import {IconRepository} from 'src/app/services/repositories/icon.repository';
import {Icon, IconType} from 'src/app/model/orm/icon.model';

@Component({
	selector: 'cats-create-page',
	templateUrl: './cats.create.page.html',
})
export class CatsCreatePage extends ObjectPage<Cat> implements OnInit {
	public x: Cat = null;
	public homeUrl: string = "/restaurants/cats";
	public requiredFields: string[] = ["name"];
  public il: Icon[] = [];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected catRepository: CatRepository,
		protected restaurantRepository: RestaurantRepository,
		protected iconRepository: IconRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
	) {
		super(admlangRepository, catRepository, appService, router);
	}

	get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
	get ll(): Lang[] {return this.langRepository.xlAll;}

	public async ngOnInit(): Promise<void> {
		try {
			await this.restaurantRepository.loadAll();
			await this.iconRepository.loadAll({type: IconType.Category});
			await this.langRepository.loadAll();
			this.x = new Cat().init();
			this.appService.monitorLog("[cats create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}
}
