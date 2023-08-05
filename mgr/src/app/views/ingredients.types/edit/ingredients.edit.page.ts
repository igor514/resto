import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {ObjectPage} from '../../_object.page';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {Lang} from 'src/app/model/orm/lang.model';
import {IngredientType} from "../../../model/orm/ingredient.type.model";
import {IngredientTypeRepository} from "../../../services/repositories/ingredient-type.repository";
import {Unit} from "../../../model/orm/unit.model";
import {UnitRepository} from "../../../services/repositories/unit.repository";

@Component({
  selector: 'ingredients-edit-page',
  templateUrl: './ingredients.edit.page.html',
})
export class IngredientsEditPage extends ObjectPage<IngredientType> implements OnInit {
  public x: IngredientType = null;
  public ts: Unit[] = []
  public homeUrl = "/restaurants/ingredients";
  public requiredFields = ["name", "restaurant_id", "unit_id", "price"];

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected ingRepository: IngredientTypeRepository,
    protected restaurantRepository: RestaurantRepository,
    protected langRepository: LangRepository,
    protected unitReporisory: UnitRepository,
    protected appService: AppService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    super(admlangRepository, ingRepository, appService, router);
  }

  get rl(): Restaurant[] {
    return this.restaurantRepository.xlAll;
  }

  get ll(): Lang[] {
    return this.langRepository.xlAll;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(async p => {
      try {
        this.x = await this.ingRepository.loadOne(parseInt(p["id"]));
        await this.restaurantRepository.loadAll();
        await this.langRepository.loadAll();
        await this.unitReporisory.loadAll();
        this.ts = this.unitReporisory.xlAll;
        this.appService.monitorLog("[ingredients edit] page loaded");
        this.ready = true;
      } catch (err) {
        this.appService.monitorLog(err, true);
      }
    });
  }
}
