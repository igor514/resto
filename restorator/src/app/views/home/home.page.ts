import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject, Subscription} from 'rxjs';
import {Employee} from 'src/app/model/orm/employee.model';
import {EmployeeStatus} from 'src/app/model/orm/employee.status.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Words} from 'src/app/model/orm/words.type';
import {AppService} from 'src/app/services/app.service';
import {AuthService} from 'src/app/services/auth.service';
import {EmployeeStatusRepository} from 'src/app/services/repositories/employee.status.repository';
import {SettingRepository} from 'src/app/services/repositories/setting.repository';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {ActivatedRoute} from '@angular/router';
import {PaymentsService} from '../../services/payments.service';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['../../common.styles/data.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public esl: EmployeeStatus[] = [];
  public langSubscription: Subscription = null;
  public localPayTime = '';
  public unsubscribe = new ReplaySubject();
  public balanceAlertMsg = '';
  public balanceAlertActive = false;

  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private authService: AuthService,
    private settingRepository: SettingRepository,
    private employeeStatusRepository: EmployeeStatusRepository,
    private route: ActivatedRoute,
    private paymentsService: PaymentsService,
  ) {
  }

  get balanceCurrency(): string {
    return this.paymentsService.balanceCurrency.code.toUpperCase();
  }

  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get employee(): Employee {
    return this.authService.authData.value.employee;
  }

  get payTime(): string {
    return this.settingRepository.settings['pay-time'];
  }

  public ngOnInit(): void {
    this.initTitle();
    this.initPayTime();
    this.initEmployeeStatuses();
  }

  public ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private initTitle(): void {
    this.appService.setTitle(this.words['restorator-home'].title[this.currentLang.slug]);
    this.langSubscription = this.appService.currentLang.subscribe(lang => this.appService.setTitle(this.words['restorator-home'].title[lang.slug]));
  }

  private initPayTime(): void {
    const payTimeParts: string[] = this.payTime.split(':');
    const hour: number = parseInt(payTimeParts[0], 10);
    const minute: number = parseInt(payTimeParts[1], 10);
    const now: Date = new Date();
    const localPayDate: Date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0));
    this.localPayTime = `${localPayDate.getHours()}:${this.appService.twoDigits(localPayDate.getMinutes())} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  }

  private async initEmployeeStatuses(): Promise<void> {
    try {
      this.esl = await this.employeeStatusRepository.loadAll();
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public async setEmployeeStatus(esid: number): Promise<void> {
    try {
      this.authService.stopChecking();
      await this.authService.setStatus(esid);
      this.authService.startChecking();
    } catch (err) {
      this.appService.showError(err);
    }
  }

  public openRechargePanel(): void {
    this.appService.rechargePanelActive = true;
  }
}
