import {Component, Input} from '@angular/core';
import {Employee} from 'src/app/model/orm/employee.model';
import {EmployeeStatus} from 'src/app/model/orm/employee.status.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {ObjectComponent} from '../_object.component';
import {IngredientType} from "../../model/orm/ingredient.type.model";
import {Unit} from "../../model/orm/unit.model";
import {LangRepository} from "../../services/repositories/lang.repository";
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";

@Component({
  selector: "the-employee",
  templateUrl: "./ingredients.component.html"
})
export class IngredientsComponent extends ObjectComponent<IngredientType> {
  @Input() rl: Restaurant[] = [];
  @Input() ll: Lang[] = [];
  @Input() ut: Unit[] = [];

  constructor(
    private langRepository: LangRepository,
    protected admlangRepository: AdmLangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }
  get langId(): number {
    return this.langRepository.xlAll.find(x => x.slug === this.admlangRepository.currentLang.name).id
  }
}
