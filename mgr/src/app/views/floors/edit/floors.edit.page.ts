import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from 'src/app/services/app.service';
import {AdmLangRepository} from 'src/app/services/repositories/admlang.repository';
import {ObjectPage} from '../../_object.page';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {FloorRepository} from '../../../services/repositories/floor.repository';
import {Floor} from '../../../model/orm/floor.model';

@Component({
  selector: 'floors-edit-page',
  templateUrl: './floors.edit.page.html',
})
export class FloorsEditPage extends ObjectPage<Floor> implements OnInit {
  public x: Floor = null;
  public homeUrl = '/restaurants/floors';
  public requiredFields: string[] = ['number'];

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected floorRepository: FloorRepository,
    protected restaurantRepository: RestaurantRepository,
    protected appService: AppService,
    protected router: Router,
    private route: ActivatedRoute,
  ) {
    super(admlangRepository, floorRepository, appService, router);
  }

  get rl(): Restaurant[] {
    return this.restaurantRepository.xlAll;
  }

  public ngOnInit(): void {
    this.route.params.subscribe(async p => {
      try {
        this.x = await this.floorRepository.loadOne(parseInt(p.id));
        await this.restaurantRepository.loadAll();
        this.appService.monitorLog('[floors edit] page loaded');
        this.ready = true;
      } catch (err) {
        this.appService.monitorLog(err, true);
      }
    });
  }
}
