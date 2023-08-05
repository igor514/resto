import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomType} from 'src/app/model/orm/room.type.model';
import {Lang} from 'src/app/model/orm/lang.model';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {EmployeeStatusRepository} from 'src/app/services/repositories/employee.status.repository';
import {LangRepository} from 'src/app/services/repositories/lang.repository';
import {ObjectPage} from '../../_object.page';
import {RoomTypeRepository} from "../../../services/repositories/room.type.repository";

@Component({
  selector: 'room-types-edit-page',
  templateUrl: './room.types.edit.html',
})
export class RoomTypesEdit extends ObjectPage<RoomType> implements OnInit {
  public x: RoomType | null = null;
  public homeUrl: string = "/restaurants/room-types";
  public requiredFields: string[] = ["name", "priority"];

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected roomTypeRepository: RoomTypeRepository,
    protected langRepository: LangRepository,
    protected appService: AppService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    super(admlangRepository, roomTypeRepository, appService, router);
  }

  get ll(): Lang[] {
    return this.langRepository.xlAll;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(async p => {
      try {
        this.x = await this.roomTypeRepository.loadOne(parseInt(p["id"]));
        await this.langRepository.loadAll();
        this.appService.monitorLog("[room.types edit] page loaded");
        this.ready = true;
      } catch (err) {
        this.appService.monitorLog(err, true);
      }
    });
  }
}
