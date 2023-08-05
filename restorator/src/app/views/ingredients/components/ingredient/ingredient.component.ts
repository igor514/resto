import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {BehaviorSubject, Subscription} from "rxjs";
import {Lang} from "src/app/model/orm/lang.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {IngredientType} from "../../../../model/orm/ingredient.type.model";
import {Unit} from "../../../../model/orm/unit.model";
import {UnitRepository} from "../../../../services/repositories/unit.repository";

@Component({
  selector: "the-ingredient",
  templateUrl: "ingredient.component.html",
})
export class IngredientComponent implements OnInit, OnDestroy {
  @Input() x: IngredientType;
  @Input() loading = false;
  @Input() cmdSave: BehaviorSubject<boolean> = null;
  @Output() save: EventEmitter<void> = new EventEmitter();

  units: Unit[] = [];
  private cmdSaveSubscription: Subscription = null;
  public errorName = false;
  public errorUnit = false;

  constructor(
    private ref: ChangeDetectorRef,
    protected appService: AppService,
    protected wordRepository: WordRepository,
    protected unitRepository: UnitRepository,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  public async ngOnInit(): Promise<void> {
    this.units = await this.unitRepository.loadAll()
    this.cmdSaveSubscription = this.cmdSave?.subscribe(cmd => cmd ? this.onSave() : null);
  }

  public ngOnDestroy(): void {
    this.cmdSaveSubscription?.unsubscribe();
  }

  public onSave(): void {
    this.errorName = false;
    this.errorUnit = false;
    if (!this.x.name) {
      this.errorName = true
      return;
    } else if (!this.x.unit_id) {
      this.errorUnit = true;
      return;
    }
    this.save.emit()
  }

  sanitizePrice(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value)
    if (value < 0 || isNaN(value)) {
      this.x.price = 0;
    } else {
      this.x.price = value;
    }

    this.ref.detectChanges()
  }
}
