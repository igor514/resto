import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {IAnswer} from 'src/app/model/answer.interface';
import {Cat} from 'src/app/model/orm/cat.model';
import {Ingredient} from 'src/app/model/orm/ingredient.model';
import {ProductImage} from 'src/app/model/orm/product.image.model';
import {Product, ProductUnit} from 'src/app/model/orm/product.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {IPathable} from 'src/app/model/pathable.interface';
import {ObjectComponent} from '../_object.component';
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";
import {STATIC_TOKEN} from "../../tokens";
import {Unit} from "../../model/orm/unit.model";
import {IngredientType} from "../../model/orm/ingredient.type.model";
import {IngredientTypeRepository} from "../../services/repositories/ingredient-type.repository";
import {UnitRepository} from "../../services/repositories/unit.repository";
import {LangRepository} from "../../services/repositories/lang.repository";

@Component({
  selector: "the-product",
  templateUrl: "./product.component.html"
})
export class ProductComponent extends ObjectComponent<Product> implements OnInit {
  @Input() rl: Restaurant[] = [];
  public units: Unit[] = [];
  public types: IngredientType[] = [];

  public tab: number = 1;
  public unitG: ProductUnit = ProductUnit.g;
  public unitMl: ProductUnit = ProductUnit.ml;

  get cl(): Cat[] {
    return this.rl.find(r => r.id === this.x.restaurant_id)?.cats || [];
  }

  // ingredients
  public ingredientsSortBy: string = "pos";
  public ingredientsSortDir: number = 1;
  public ingredientsSubformActive: boolean = false;
  public ingredient: Ingredient = new Ingredient().init();

  constructor(
    @Inject(STATIC_TOKEN) protected staticPath: string,
    protected ingrRepository: IngredientTypeRepository,
    protected unitsRepository: UnitRepository,
    protected admlangRepository: AdmLangRepository,
    protected langRepository: LangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }

  async ngOnInit(): Promise<void> {
    await this.langRepository.loadAll()
    await this.unitsRepository.loadAll()
    this.units = this.unitsRepository.xlAll;
    this.types = await this.ingrRepository.loadByRestaurant(this.x.restaurant_id)
  }

  get langId(): number {
    return this.langRepository.xlAll.find(x => x.slug === this.admlangRepository.currentLang.name).id
  }

  public ingredientsOnSubformKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
      this.ingredientsAdd();
    }
  }

  public ingredientsAdd(): void {
    const {unit_id, type_id, name } = this.ingredient
    if (!unit_id || !type_id || !name) {
      return
    }
    this.ingredient.type = new IngredientType().build(this.types.find(t => t.id === type_id))
    this.ingredient.unit = new Unit().build(this.units.find(u => u.id === unit_id))
    this.x.ingredients.push(this.ingredient);
    this.appService.sort(this.x.ingredients, this.ingredientsSortBy, this.ingredientsSortDir);
    this.ingredient = new Ingredient().init();
    this.ingredientsSubformActive = false;
  }

  public ingredientsChangeSorting(sortBy): void {
    if (sortBy === this.ingredientsSortBy) {
      this.ingredientsSortDir *= -1;
    } else {
      this.ingredientsSortBy = sortBy;
      this.ingredientsSortDir = 1;
    }

    this.appService.sort(this.x.ingredients, this.ingredientsSortBy, this.ingredientsSortDir);
  }

  public ingredientsRemove(i: number): void {
    if (confirm(this.currentLang.phrases['workspace-sure'])) {
      this.x.ingredients.splice(i, 1);
    }
  }

  // images
  public imgSubformActive: boolean = false;
  public imgProgress: number = 0;
  public imgFolder: string = "products";
  public imgResizeWidth: number[] = [500];
  public img: ProductImage = new ProductImage().init();

  public imgAdd(): void {
    this.x.images.push(this.img);
    this.appService.sort(this.x.images, "pos", 1);
    this.img = new ProductImage().init();
    this.imgSubformActive = false;
    this.imgProgress = 0;
  }

  public imgOnSubformKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      event.preventDefault();
      this.imgAdd();
    }
  }

  public imgRemove(i: number): void {
    if (confirm(this.currentLang.phrases['workspace-sure'])) {
      this.x.images.splice(i, 1);
    }
  }

  public imgDeleteImg(): void {
    this.img.img = null;
    this.imgProgress = 0;
  }

  public imgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): void {
    if (event.type === HttpEventType.UploadProgress) {
      this.imgProgress = Math.round(100 * event.loaded / event.total);
    } else if (event.type === HttpEventType.Response) {
      if (event.body.statusCode !== 200) {
        this.appService.monitorLog(event.body.error, true);
      } else {
        this.appService.monitorLog(`uploaded: ${event.body.data.paths[0]}`);
        this.img.img = event.body.data.paths[0];
      }
    }
  }
}
