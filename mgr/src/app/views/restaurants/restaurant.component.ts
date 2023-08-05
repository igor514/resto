import {Component, Input, OnInit} from '@angular/core';
import {Currency} from 'src/app/model/orm/currency.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {ObjectComponent} from '../_object.component';
import {RestaurantRepository} from "../../services/repositories/restaurant.repository";
import {AdmLangRepository} from "../../services/repositories/admlang.repository";
import {AppService} from "../../services/app.service";
import {FilesService} from "../../services/files.service";
import {FacilityType} from "../../model/orm/facility.type.model";
import {FacilityTypeRepository} from "../../services/repositories/facility.type.repository";
import {FeeDto} from "../../model/dto/fee.dto";
import {sanitizeFee} from "../../../utils";
import {RestaurantFeeConfig} from "../../model/orm/payment.fee.config";

@Component({
  selector: "the-restaurant",
  templateUrl: "./restaurant.component.html"
})
export class RestaurantComponent extends ObjectComponent<Restaurant> implements OnInit {
  @Input() cl: Currency[] = [];
  @Input() ll: Lang[] = [];
  @Input() ff: FeeDto[] = [];

  activeFeeTab: string;
  types: FacilityType[] = [];

  constructor(
    protected restaurantRepository: RestaurantRepository,
    protected facilityTypesRepository: FacilityTypeRepository,
    protected admlangRepository: AdmLangRepository,
    protected appService?: AppService,
    protected filesService?: FilesService,
  ) {
    super(admlangRepository, appService, filesService);
  }

  sanitize(event: Event, key: string): void {
    const value = sanitizeFee((event.target as HTMLInputElement).valueAsNumber);
    this.x.fees.find(f => f.payment_type === this.activeFeeTab)[key] = value;
  }

  ngOnInit(): void {
    this.activeFeeTab = this.ff[0].type
    this.facilityTypesRepository.loadAll().then(res => {
      this.types = this.facilityTypesRepository.xlAll;
    });
  }
  switchTab(type: string): void {
    this.activeFeeTab = type;
  }

  get globalFee(): FeeDto {
    return this.ff.find(f => f.type === this.activeFeeTab)
  }
  get activeFee(): RestaurantFeeConfig {
    return this.x.fees.find(f => f.payment_type === this.activeFeeTab)
  }

  get paymentTypes(): string[] {
    return this.ff.map(f => f.type)
  }
}
