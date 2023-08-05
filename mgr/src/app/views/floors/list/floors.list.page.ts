import {Component, OnInit} from '@angular/core';

import {AppService} from '../../../services/app.service';
import {ListPage} from '../../_list.page';
import {AdmLangRepository} from '../../../services/repositories/admlang.repository';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {Restaurant} from 'src/app/model/orm/restaurant.model';
import {FloorRepository} from 'src/app/services/repositories/floor.repository';
import {Floor} from "../../../model/orm/floor.model";

@Component({
  selector: 'floors-list-page',
  templateUrl: './floors.list.page.html',
})
export class FloorsListPage extends ListPage<Floor> implements OnInit {
  public homeUrl = '/restaurants/floors';

  constructor(
    protected admlangRepository: AdmLangRepository,
    protected floorRepository: FloorRepository,
    protected restaurantRepository: RestaurantRepository,
    protected appService: AppService,
  ) {
    super(admlangRepository, floorRepository, appService);
  }

  get rl(): Restaurant[] {
    return this.restaurantRepository.xlAll;
  }

  get filterRestaurantId(): number {
    return this.floorRepository.filterRestaurantId;
  }

  set filterRestaurantId(v: number) {
    this.floorRepository.filterRestaurantId = v;
  }

  public async ngOnInit(): Promise<void> {
    try {
      await this.floorRepository.loadChunk();
      await this.restaurantRepository.loadAll();
      this.appService.monitorLog('[floors] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }
}
