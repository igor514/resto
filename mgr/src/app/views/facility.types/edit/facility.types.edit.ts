import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FacilityType} from 'src/app/model/orm/facility.type.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {AppService} from 'src/app/services/app.service';
import { AdmLangRepository } from 'src/app/services/repositories/admlang.repository';
import {FacilityTypeRepository} from 'src/app/services/repositories/facility.type.repository';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {ObjectPage} from '../../_object.page';

@Component({
  selector: 'facility-types-edit-page',
  templateUrl: './facility.types.edit.html',
})
export class FacilityTypesEdit extends ObjectPage<FacilityType> implements OnInit {
  public x: FacilityType | null = null;
  public homeUrl: string = "/restaurants/facility-types";
  public requiredFields: string[] = ["name"];

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected facilityTypeRepository: FacilityTypeRepository,
    protected langRepository: LangRepository,
    protected appService: AppService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    super(admlangRepository, facilityTypeRepository, appService, router);
  }

  get ll(): Lang[] {
    return this.langRepository.xlAll;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(async p => {
      try {
        this.x = await this.facilityTypeRepository.loadOne(parseInt(p["id"]));
        await this.langRepository.loadAll();
        this.appService.monitorLog("[facility.types edit] page loaded");
        this.ready = true;
      } catch (err) {
        this.appService.monitorLog(err, true);
      }
    });
  }
}
