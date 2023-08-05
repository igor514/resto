import {Component} from '@angular/core';
import {AppService} from 'src/app/services/app.service';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {RestaurantsListPage} from '../restaurants.list.page';
import {ActiveRestaurantsService} from './active.restaurants.service';
import {FacilityTypesRepository} from '../../../../services/repositories/facility.type.repository';
import {PaymentService} from '../../../../services/payment.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'active-restaurants-page',
  templateUrl: '../restaurants.list.page.html',
  styleUrls: ['../../../../common.styles/data.scss'],
})
export class ActiveRestaurantsPage extends RestaurantsListPage {
  public type = 'active';

  constructor(
    protected appService: AppService,
    protected wordRepository: WordRepository,
    protected restaurantRepository: RestaurantRepository,
    protected listService: ActiveRestaurantsService,
    protected facilityTypesRepository: FacilityTypesRepository,
    protected route: ActivatedRoute,
    protected paymentsService: PaymentService,
    protected router: Router,
  ) {
    super(appService, wordRepository, restaurantRepository, listService, facilityTypesRepository, route, paymentsService, router);
  }
}
