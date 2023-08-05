import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lang} from 'src/app/model/orm/lang.model';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {ObjectPage} from '../../_object.page';
import {UnitRepository} from "../../../services/repositories/unit.repository";
import {Unit} from "../../../model/orm/unit.model";

@Component({
  selector: 'units-edit-page',
  templateUrl: './units.edit.html',
})
export class UnitsEdit extends ObjectPage<Unit> implements OnInit {
  public x: Unit | null = null;
  public homeUrl: string = "/restaurants/units";
  public requiredFields: string[] = ["name", "short"];
  public units: Unit[] = [];

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected unitRepository: UnitRepository,
    protected langRepository: LangRepository,
    protected appService: AppService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    super(admlangRepository, unitRepository, appService, router);
  }

  get ll(): Lang[] {
    return this.langRepository.xlAll;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(async p => {
      try {
        this.x = await this.unitRepository.loadOne(parseInt(p["id"]));
        await this.langRepository.loadAll();
        await this.unitRepository.loadAll()
        this.units = this.unitRepository.xlAll.filter(u => u.id !== this.x.id)
        this.appService.monitorLog("[unit edit] page loaded");
        this.ready = true;
      } catch (err) {
        this.appService.monitorLog(err, true);
      }
    });
  }
}
