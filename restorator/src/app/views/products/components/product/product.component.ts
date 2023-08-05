import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject, Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import * as Sortable from "sortablejs";
import {SortableOptions} from "sortablejs";
import {IAnswer} from "src/app/model/dto/answer.interface";
import {IPathable} from "src/app/model/dto/pathable.interface";
import {IHTMLInputEvent} from "src/app/model/htmlinputevent.interface";
import {Ingredient} from "src/app/model/orm/ingredient.model";
import {Lang} from "src/app/model/orm/lang.model";
import {ProductImage} from "src/app/model/orm/product.image.model";
import {Product, ProductUnit} from "src/app/model/orm/product.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {FilesService} from "src/app/services/files.service";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {IngredientType} from "../../../../model/orm/ingredient.type.model";
import {STATIC_TOKEN} from "../../../../tokens";
import {IngredientTypeRepository} from "../../../../services/repositories/ingredient.type.repository";
import {AuthService} from "../../../../services/auth.service";
import {Restaurant} from "../../../../model/orm/restaurant.model";
import {Unit} from "../../../../model/orm/unit.model";
import {getIngredientPrice, getProductPrice} from "../../../../utils/product-price";
import {UnitRepository} from "../../../../services/repositories/unit.repository";

@Component({
  selector: "the-product",
  templateUrl: "product.component.html",
  styleUrls: ["product.component.scss"],
  encapsulation: ViewEncapsulation.None // for ng-select
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() x: Product;
  @Input() loading = false;
  @Input() cmdSave: BehaviorSubject<boolean> = null;
  @Output() save: EventEmitter<void> = new EventEmitter();

  private cmdSaveSubscription: Subscription = null;
  public errorName = false;
  public showIngErrors = false;
  public unitG: ProductUnit = ProductUnit.g;
  public unitMl: ProductUnit = ProductUnit.ml;
  public types: IngredientType[] = []
  public units: Unit[] = []
  ingredient = ''

  constructor(
    @Inject(STATIC_TOKEN) protected staticPath: string,
    protected appService: AppService,
    protected authService: AuthService,
    protected wordRepository: WordRepository,
    protected filesService: FilesService,
    protected ingredientRepository: IngredientTypeRepository,
    protected unitRepository: UnitRepository,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get restaurant(): Restaurant {
    return this.authService.authData.value.employee.restaurant
  }

  get currencySymbol(): string {
    return this.authService.authData.value.employee?.restaurant?.currency?.symbol;
  }

  public async ngOnInit(): Promise<void> {
    this.types = await this.ingredientRepository.loadByRestaurant(this.restaurant.id)
    this.units = await this.unitRepository.loadAll()
    this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
  }

  public ngOnDestroy(): void {
    this.cmdSaveSubscription?.unsubscribe();
  }

  public onSave(): void {
    if (!this.validateIng()) {
      this.showIngErrors = true
    } else {
      this.showIngErrors = false;
      if (this.validate()) {
        this.save.emit();
      }
    }
  }

  private validateIng(): boolean {
    for (const ing of this.x.ingredients) {
      if (!ing.unit_id || !ing.type_id || isNaN(parseFloat(ing.amount as any))) {
        return false
      }
    }
    return true
  }

  private validate(): boolean {
    let error = false;
    this.x.name = this.appService.trim(this.x.name);

    if (!this.x.name.length) {
      this.errorName = true;
      error = true;
    } else {
      this.errorName = false;
    }

    return !error;
  }

  // images
  @ViewChild("imgupload") imgUploadElementRef: ElementRef;
  public imgLoading: boolean = false;
  private imgFolder: string = "products";
  private imgResizeWidth: number[] = [500];
  public imgDeleteConfirmActive: boolean = false;
  public imgDeleteIndex: number = null;
  public imgSortableOptions: SortableOptions = {
    onUpdate: this.imgOnSortableUpdate.bind(this),
    onMove: this.imgOnSortableMove,
    animation: 150,
    handle: ".de-image-handle",
  };

  public imgOnUploadClick(): void {
    this.imgUploadElementRef.nativeElement.click();
  }

  public imgUpload(event: IHTMLInputEvent): void {
    let file: File = <File>event.target.files[0];

    if (this.imgValidate(file)) {
      this.imgLoading = true;
      let fd: FormData = new FormData();
      fd.append("folder", this.imgFolder);
      fd.append("file", file, file.name);
      fd.append("resize", JSON.stringify(this.imgResizeWidth));
      this.filesService
        .imgUploadResize(fd)
        .subscribe(
          event => this.imgProcessResponse(event),
          err => {
            this.appService.showError(err.message);
            this.imgLoading = false;
          });
    }
  }

  public async imgProcessResponse(event: HttpEvent<IAnswer<IPathable>>): Promise<void> {
    if (event.type === HttpEventType.Response) {
      this.imgLoading = false;

      if (event.body.statusCode !== 200) {
        this.appService.showError(event.body.error);
        return;
      }

      const newImage = new ProductImage();
      newImage.img = event.body.data.paths[0];
      newImage.pos = this.x.images.length ? Math.max(...this.x.images.map(i => i.pos)) + 1 : 0;
      // костыль под глюк в sortable, иначе при добавлении рушится порядок
      const temp = this.x.images;
      this.x.images = [];
      temp.push(newImage);
      await this.appService.pause(1);
      this.x.images = temp;
    }
  }

  public imgValidate(file: File): boolean {
    return file && ["image/jpeg", "image/png"].includes(file.type);
  }

  public imgOnDelete(i: number): void {
    this.imgDeleteIndex = i;
    this.imgDeleteConfirmActive = true;
  }

  public imgDelete(): void {
    this.imgDeleteConfirmActive = false;
    this.x.images.splice(this.imgDeleteIndex, 1);
  }

  private imgOnSortableUpdate(): void {
    this.x.images.forEach((img, index) => img.pos = index);
  }

  public imgOnSortableMove(event: Sortable.MoveEvent, originalEvent: any): boolean {
    return !event.related.classList.contains("de-image-add");
  }

  // ingredients
  public ingreDeleteConfirmActive: boolean = false;
  public ingreDeleteConfirmMsg: string = "";
  public ingreDeleteIndex: number = null;

  public async ingreAdd(): Promise<void> {
    const ingredient = new Ingredient();
    ingredient.name = "";
    ingredient.unit_id = null;
    ingredient.excludable = false;
    ingredient.pos = this.x.ingredients.length ? Math.max(...this.x.ingredients.map(i => i.pos)) + 1 : 0;
    this.x.ingredients.push(ingredient);
  }

  public ingreOnDelete(i: number): void {
    this.ingreDeleteIndex = i;
    this.ingreDeleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${this.x.ingredients[i].name}"?`;
    this.ingreDeleteConfirmActive = true;
  }

  public ingreDelete(): void {
    this.ingreDeleteConfirmActive = false;
    this.x.ingredients.splice(this.ingreDeleteIndex, 1);
  }

  public ingreOnDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.x.ingredients, event.previousIndex, event.currentIndex);
    this.x.ingredients.forEach((ingredient, index) => ingredient.pos = index);
  }

  public price(ig: Ingredient): number {
    const price = getIngredientPrice(ig)
    return Number.parseFloat(price.toFixed(4))
  }

  public total(): number {
    const sum = getProductPrice(this.x)
    return Number.parseFloat(sum.toFixed(4))
  }

  onTypeSelect(index: number, type: IngredientType): void {
    if (type.id !== this.x.ingredients[index].type_id) {
      this.x.ingredients[index].unit = null
      this.x.ingredients[index].unit_id = null
    }
    this.x.ingredients[index].type = type
    this.x.ingredients[index].type_id = type.id
  }

  typeUnits(type_id?: number): Unit[] {
    const units = [];
    if (type_id && this.types.length) {
      const type = this.types.find(x => {
        return type_id === x.id
      })

      const unit = this.units.find(u => u.id === type.unit_id);
      if (!type.unit || !unit) return []
      if (unit) {
        units.push(type.unit)
      }
      if (unit?.related_id) {
        const parent = this.units.find(u => u.id === unit.related_id) // get parent
        const related = this.units.filter(u => u.related_id === unit.related_id && u.id !== unit.id) // get siblings
        units.push(parent, ...related)
      } else if (unit.id) {
        const related = this.units.filter(u => u.related_id === unit?.id) // get ancestors
        units.push(...related)
      }
    }
    return units
  }

  onUnitSelect(index: number, event: Event): void {
    const val = parseInt((event.target as HTMLSelectElement).value, 10)
    if (!isNaN(val)) {
      const unit = this.units.find(u => u.id === val)
      this.x.ingredients[index].unit = unit
      this.x.ingredients[index].unit_id = unit.id
    } else {
      this.x.ingredients[index].unit = null
      this.x.ingredients[index].unit_id = null
    }

  }

  protected readonly isNaN = isNaN;
}
