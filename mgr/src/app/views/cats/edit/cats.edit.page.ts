import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
	selector: 'cats-edit-page',
	templateUrl: './cats.edit.page.html',
})
export class CatsEditPage extends ObjectPage<Cat> implements OnInit {
	public x: Cat = null;
	public homeUrl: string = "/restaurants/cats";
	public requiredFields: string[] = ["name", "email"];
  public il: Icon[] = [];

	constructor(
		protected admlangRepository: AdmLangRepository,
		protected catRepository: CatRepository,
		protected restaurantRepository: RestaurantRepository,
		protected iconRepository: IconRepository,
		protected langRepository: LangRepository,
		protected appService: AppService,
		protected router: Router,
		private route: ActivatedRoute,
	) {
		super(admlangRepository, catRepository, appService, router);
	}

	get rl(): Restaurant[] {return this.restaurantRepository.xlAll;}
	get ll(): Lang[] {return this.langRepository.xlAll;}

	public ngOnInit(): void {
		this.route.params.subscribe(async p => {
			try {
				this.x = await this.catRepository.loadOne(parseInt(p["id"]));
				await this.restaurantRepository.loadAll();
        await this.iconRepository.loadAll({type: IconType.Category});
				await this.langRepository.loadAll();
				this.appService.monitorLog("[cats edit] page loaded");
				this.ready = true;
			} catch (err) {
				this.appService.monitorLog(err, true);
			}
		});
	}
}
