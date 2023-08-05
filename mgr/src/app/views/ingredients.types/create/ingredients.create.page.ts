import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {ObjectPage} from '../../_object.page';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {Lang} from 'src/app/model/orm/lang.model';
import {IngredientTypeRepository} from "../../../services/repositories/ingredient-type.repository";
import {IngredientType} from "../../../model/orm/ingredient.type.model";
import {Unit} from "../../../model/orm/unit.model";
import {UnitRepository} from "../../../services/repositories/unit.repository";

@Component({
  selector: 'ingredients-create-page',
  templateUrl: './ingredients.create.page.html',
})
export class IngredientsCreatePage extends ObjectPage<IngredientType> implements OnInit {
  public x: IngredientType = null;
  public ts: Unit[] = []
  public homeUrl: string = "/restaurants/ingredients";
  public requiredFields: string[] = ["name", "restaurant_id", "unit_id", "price"];

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected ingRepository: IngredientTypeRepository,
    protected restaurantRepository: RestaurantRepository,
    protected langRepository: LangRepository,
    protected appService: AppService,
    protected unitRepository: UnitRepository,
    protected router: Router,
  ) {
    super(admlangRepository, ingRepository, appService, router);
  }

  get rl(): Restaurant[] {
    return this.restaurantRepository.xlAll;
  }

  get ll(): Lang[] {
    return this.langRepository.xlAll;
  }

  public async ngOnInit(): Promise<void> {
    try {
      await this.restaurantRepository.loadAll();
      await this.langRepository.loadAll();
      await this.unitRepository.loadAll();
      this.ts = this.unitRepository.xlAll;
      this.x = new IngredientType().init();
      this.appService.monitorLog("[ingredients create] page loaded");
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }
}
