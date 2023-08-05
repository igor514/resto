import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Lang} from 'src/app/model/orm/lang.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {AuthService} from 'src/app/services/auth.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {FloorRepository} from '../../../../services/repositories/floor.repository';
import {Floor} from '../../../../model/orm/floor.model';

@Component({
  selector: 'create-floors-page',
  templateUrl: 'create.floors.page.html',
  styleUrls: ['../../../../common.styles/data.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateFloorsPage implements OnInit, OnDestroy {
  public langSubscription: Subscription = null;
  public authSubscription: Subscription = null;
  public floor: Floor = null;
  public formLoading = false;
  public cmdSave: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private floorRepository: FloorRepository,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  public ngOnInit(): void {
    this.initTitle();
    this.initAuthCheck();
    this.initFloor();
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  private initTitle(): void {
    this.appService.setTitle(this.words['restorator-floors']['title-create'][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words['restorator-floors']['title-create'][lang.slug]));
  }

  private initAuthCheck(): void {
    this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl('/') : null);
  }

  private initFloor(): void {
    this.floor = new Floor().init(this.authService.authData.value.employee.restaurant_id);
  }

  public async create(): Promise<void> {
    try {
      this.formLoading = true;
      await this.floorRepository.create(this.floor);
      this.formLoading = false;
      this.router.navigateByUrl('/floors-rooms/floors');
    } catch (err) {
      this.formLoading = false;
      this.appService.showError(err);
    }
  }
}
