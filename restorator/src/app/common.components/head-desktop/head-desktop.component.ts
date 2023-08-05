import {Component, EventEmitter, Output} from "@angular/core";
import {Lang} from "src/app/model/orm/lang.model";
import {Restaurant} from "src/app/model/orm/restaurant.model";
import {Words} from "src/app/model/orm/words.type";
import {AppService} from "src/app/services/app.service";
import {AuthService} from "src/app/services/auth.service";
import {WordRepository} from "src/app/services/repositories/word.repository";
import {PaymentsService} from "../../services/payments.service";

@Component({
  selector: "head-desktop",
  templateUrl: "head-desktop.component.html",
  styleUrls: ["head-desktop.component.scss"],
})
export class HeadDesktopComponent {
  constructor(
    private appService: AppService,
    private wordRepository: WordRepository,
    private authService: AuthService,
    private paymentsService: PaymentsService,
  ) {
  }

  openRechargePanel(): void {
    this.appService.rechargePanelActive = true;
  }

  get currency(): string {
    return this.paymentsService.balanceCurrency.code.toUpperCase();
  }
  get words(): Words {
    return this.wordRepository.words;
  }

  get currentLang(): Lang {
    return this.appService.currentLang.value;
  }

  get title(): string {
    return this.appService.title;
  }

  get showLogout(): boolean {
    return this.authService.authData.value !== null;
  }

  get showMoney(): boolean {
    return this.authService.authData.value !== null && this.authService.authData.value.employee.is_admin;
  }

  get restaurant(): Restaurant {
    return this.authService.authData.value.employee.restaurant;
  }

  set langPanelActive(v: boolean) {
    this.appService.langPanelActive = v;
  }
}
