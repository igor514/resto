import {Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Subscription} from "rxjs";
import {Currency} from "src/app/model/orm/currency.model";
import {Lang} from "src/app/model/orm/lang.model";
import {Restaurant} from "src/app/model/orm/restaurant.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {CurrencyRepository} from "src/app/services/repositories/currency.repository";
import {LangRepository} from "src/app/services/repositories/lang.repository";
import {RestaurantRepository} from "src/app/services/repositories/restaurant.repository";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {FacilityTypesRepository} from "../../../../services/repositories/facility.type.repository";
import {FacilityType} from "../../../../model/orm/facility.type.model";
import {take} from "rxjs/operators";
import {PaymentService} from "../../../../services/payment.service";

@Component({
  selector: "create-restaurants-page",
  templateUrl: "create.restaurants.page.html",
  styleUrls: ["../../../../common.styles/data.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CreateRestaurantsPage implements OnInit, OnDestroy {
  public cl: Currency[] = [];
  public langSubscription: Subscription = null;
  public restaurant: Restaurant;
  public formLoading: boolean = false;
  public formErrorEmailDuplication: boolean = false;
  public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public types: FacilityType[] = [];
  public paymentMethods: string[] = [];

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private restaurantRepository: RestaurantRepository,
    private currencyRepository: CurrencyRepository,
    private langRepository: LangRepository,
    private facilityTypesRepository: FacilityTypesRepository,
    private router: Router,
    private route: ActivatedRoute,
    private paymentService: PaymentService,
  ) {}

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get type(): string {
    return this.route.snapshot.params["type"];
  }

  get ll(): Lang[] {
    return this.langRepository.langs;
  }

  public async ngOnInit(): Promise<void> {
    this.initTitle();
    this.initCurrencies();

    const response = await this.paymentService.getPaymentTypes().toPromise()
    this.paymentMethods = response.data;
    this.restaurant = new Restaurant().init(response.data)

    this.facilityTypesRepository.loadAll().then(() => {
      this.types = this.facilityTypesRepository.types;
      this.route.queryParamMap.pipe(take(1)).subscribe((param) => {
        const type_id = Number.parseInt(param.get('type_id'), 10);
        const type = this.types.find((t) => t.id === type_id);
        if (!Number.isNaN(type_id) && type) {
          this.restaurant.type_id = type_id;
        }
      })
    })

  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }

  private initTitle(): void {
    this.appService.setTitle(this.words["owner-restaurants"][`title-create`][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words["owner-restaurants"][`title-create`][lang.slug]));
  }

  private async initCurrencies(): Promise<void> {
    try {
      this.cl = await this.currencyRepository.loadAll();
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public async create(): Promise<void> {
    try {
      this.formLoading = true;
      this.formErrorEmailDuplication = false;
      let statusCode = await this.restaurantRepository.create(this.restaurant);
      this.formLoading = false;

      if (statusCode === 200) {
        this.router.navigateByUrl("/restaurants/active"); // после создания переходим в активные
      } else if (statusCode === 409) {
        this.formErrorEmailDuplication = true;
      } else {
        this.appService.showError(this.words['common']['error'][this.currentLang.slug]);
      }
    } catch (err) {
      this.appService.showError(err);
      this.formLoading = false;
    }
  }
}
