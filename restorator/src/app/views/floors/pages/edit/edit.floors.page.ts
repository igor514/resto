import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Lang} from 'src/app/model/orm/lang.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {AuthService} from 'src/app/services/auth.service';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {Floor} from '../../../../model/orm/floor.model';
import {FloorRepository} from '../../../../services/repositories/floor.repository';

@Component({
  selector: 'edit-floors-page',
  templateUrl: 'edit.floors.page.html',
  styleUrls: ['../../../../common.styles/data.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditFloorsPage implements OnInit, OnDestroy {
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
    private route: ActivatedRoute,
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
    this.appService.setTitle(this.words['restorator-floors']['title-edit'][this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words['restorator-floors']['title-edit'][lang.slug]));
  }

  private initAuthCheck(): void {
    this.authSubscription = this.authService.authData.subscribe(ad => !ad.employee.is_admin ? this.router.navigateByUrl('/') : null);
  }

  private async initFloor(): Promise<void> {
    try {
      this.floor = await this.floorRepository.loadOne(parseInt(this.route.snapshot.params.id, 10));
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public async update(): Promise<void> {
    try {
      this.formLoading = true;
      await this.floorRepository.update(this.floor);
      this.formLoading = false;
      this.router.navigateByUrl('/floors-rooms/floors');
    } catch (err) {
      this.formLoading = false;
      this.appService.showError(err);
    }
  }
}
