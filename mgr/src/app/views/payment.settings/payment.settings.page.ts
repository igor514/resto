import {Component, OnInit} from '@angular/core';
import {AdmLang} from 'src/app/model/admlang.model';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {SectionPage} from '../_section.page';
import {FeeDto} from "../../model/dto/fee.dto";
import {PaymentService} from "../../services/payment.service";
import {sanitizeFee} from "../../../utils";

@Component({
  selector: 'options-page',
  templateUrl: './payment.settings.page.html',
})
export class PaymentSettingsPage extends SectionPage implements OnInit {
  public ready = false;
  public selectedLang = "";
  fees: FeeDto[];
  activeFee: FeeDto;

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected paymentService: PaymentService,
    private appService: AppService,
  ) {
    super(admlangRepository);
  }

  get currentLang(): AdmLang {
    return this.admlangRepository.currentLang;
  }

  get paymentTypes(): string[] {
    return this.fees.map(f => f.type)
  }

  switchTab(type: string) {
    if (this.activeFee.type !== type) {
      this.activeFee = this.fees.find(f => f.type === type)
    }
  }

  public ngOnInit(): void {
    this.selectedLang = this.currentLang.name;
    this.appService.monitorLog("[fees] page loaded");
    this.paymentService.balanceFees().subscribe(resp => {
      this.fees = resp.data;
      this.activeFee = resp.data?.[0]
      this.ready = true;
    });
  }

  sanitize(event: Event, key: string): void {
    const value = sanitizeFee((event.target as HTMLInputElement).valueAsNumber);
    this.activeFee[key] = value;
    this.updateParam(key, value);
  }

  public async updateParam(p: string, v: any): Promise<void> {
    try {
      await this.paymentService.updateFees({type: this.activeFee.type, [p]: v}).toPromise();
      this.appService.monitorLog(`[fees] ${p} updated`);
    } catch (err) {
      this.appService.monitorLog(`[fees] error: ${err}`, true);
    }
  }
}
