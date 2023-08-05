import {Directive, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject, Subject, Subscription} from 'rxjs';
import {IChunk} from 'src/app/model/chunk.interface';
import {Lang} from 'src/app/model/orm/lang.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {RestaurantsListService} from './restaurants.list.service';
import {FacilityTypesRepository} from '../../../services/repositories/facility.type.repository';
import {FacilityType} from '../../../model/orm/facility.type.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../services/payment.service';
import {takeUntil} from "rxjs/operators";

@Directive()
export abstract class RestaurantsListPage implements OnInit, OnDestroy {
  public rlChunk: IChunk<Restaurant> = null;
  public rlLoading = false;
  private unsubscribe = new ReplaySubject();
  public types: FacilityType[] = [];
  public rlSortingVariants: any[][] = // для мобильной верстки
    [['created_at', 1], ['created_at', -1], ['name', 1], ['name', -1], ['money', 1], ['money', -1], ['daysleft', 1], ['daysleft', -1]];
  public abstract type: string;
  public langSubscription: Subscription = null;
  public deleteConfirmActive = false;
  public deleteConfirmMsg = '';
  private deleteId: number = null;
  public rechargeRestaurant: Restaurant = null;
  public rechargePanelActive = false;

  constructor(
    protected appService: AppService,
    protected wordRepository: WordRepository,
    protected restaurantRepository: RestaurantRepository,
    protected listService: RestaurantsListService,
    protected facilityTypeRepository: FacilityTypesRepository,
    protected route: ActivatedRoute,
    protected paymentsService: PaymentService,
    protected router: Router,
  ) {
  }

  get currency(): string {
    return this.paymentsService.balanceCurrency.symbol
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get rl(): Restaurant[] {
    return this.rlChunk.data;
  }

  get rlAllLength(): number {
    return this.rlChunk.allLength;
  }

  get rlLength(): number {
    return this.restaurantRepository.chunkLength;
  }

  get rlCurrentPart(): number {
    return this.listService.currentPart;
  }

  set rlCurrentPart(v: number) {
    this.listService.currentPart = v;
  }

  get rlSortBy(): string {
    return this.listService.sortBy;
  }

  set rlSortBy(v: string) {
    this.listService.sortBy = v;
  }

  get rlSortDir(): number {
    return this.listService.sortDir;
  }

  set rlSortDir(v: number) {
    this.listService.sortDir = v;
  }

  get rlFilterName(): string {
    return this.listService.filterName;
  }

  set rlFilterName(v: string) {
    this.listService.filterName = v;
  }

  get rlFilterDaysleft(): string {
    return this.listService.filterDaysleft;
  }

  set rlFilterDaysleft(v: string) {
    this.listService.filterDaysleft = v;
  }

  get rlFilterActive(): boolean {
    return this.listService.filterActive;
  }

  get rlFilter() {
    return {active: this.rlFilterActive, name: this.rlFilterName, daysleft: this.rlFilterDaysleft};
  }

  public async ngOnInit(): Promise<void> {
    this.initTitle();
    this.initTypes();
    await this.initRestaurants();

    this.paymentsService.recharge$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async (value) => {
        const index = this.rlChunk.data.findIndex(r => r.id === value.restaurant_id);
        const updated = await this.restaurantRepository.loadOne(value.restaurant_id);
        this.rlChunk.data[index].money = updated.money;
      });
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  private initTitle(): void {
    this.appService.setTitle(this.words['owner-restaurants'][`title-${this.type}`][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words['owner-restaurants'][`title-${this.type}`][lang.slug]));
  }

  public async initTypes(): Promise<void> {
    await this.facilityTypeRepository.loadAll();
    this.types = this.facilityTypeRepository.types;
  }

  public async initRestaurants(): Promise<void> {
    try {
      this.rlLoading = true;
      this.rlChunk = await this.restaurantRepository.loadChunk(this.rlCurrentPart, this.rlSortBy, this.rlSortDir, this.rlFilter);
      // after deleting or filtering may be currentPart is out of
      // possible diapason, then decrease and reload again
      if (this.rlCurrentPart > 0 && this.rlCurrentPart > Math.ceil(this.rlAllLength / this.rlLength) - 1) {
        this.rlCurrentPart = 0;
        this.initRestaurants();
      } else {
        await this.appService.pause(500);
        this.rlLoading = false;
      }
    } catch (err) {
      this.appService.showError(err);
      this.rlLoading = false;
    }
  }

  public changeSorting(sortBy: string): void {
    if (this.rlSortBy === sortBy) {
      this.rlSortDir *= -1;
    } else {
      this.rlSortBy = sortBy;
      this.rlSortDir = 1;
    }

    this.initRestaurants();
  }

  public setSorting(i: string): void {
    const sorting = this.rlSortingVariants[parseInt(i, 10)];
    this.rlSortBy = sorting[0];
    this.rlSortDir = sorting[1];
    this.initRestaurants();
  }

  public onDelete(r: Restaurant): void {
    this.deleteId = r.id;
    this.deleteConfirmMsg = `${this.words['common']['delete'][this.currentLang.slug]} "${r.name}"?`;
    this.deleteConfirmActive = true;
  }

  public async delete(): Promise<void> {
    try {
      this.deleteConfirmActive = false;
      this.rlLoading = true;
      await this.restaurantRepository.delete(this.deleteId);
      this.initRestaurants();
    } catch (err) {
      this.appService.showError(err);
      this.rlLoading = false;
    }
  }

  public onRecharge(r: Restaurant): void {
    this.rechargeRestaurant = r;
    this.rechargePanelActive = true;
  }

  public getType(id: number): FacilityType {
    return this.types.find(t => t.id === id);
  }
}
