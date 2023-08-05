import {Component} from '@angular/core';
import {AppService} from 'src/app/services/app.service';
import {RestaurantRepository} from 'src/app/services/repositories/restaurant.repository';
import {WordRepository} from 'src/app/services/repositories/word.repository';
import {RestaurantsListPage} from '../restaurants.list.page';
import {InactiveRestaurantsService} from './inactive.restaurants.service';
import {FacilityTypesRepository} from '../../../../services/repositories/facility.type.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../../services/payment.service';

@Component({
  selector: 'inactive-restaurants-page',
  templateUrl: '../restaurants.list.page.html',
  styleUrls: ['../../../../common.styles/data.scss'],
})
export class InactiveRestaurantsPage extends RestaurantsListPage {
  public type = 'inactive';

  constructor(
    protected appService: AppService,
    protected wordRepository: WordRepository,
    protected restaurantRepository: RestaurantRepository,
    protected listService: InactiveRestaurantsService,
    protected facilityTypesRepository: FacilityTypesRepository,
    protected route: ActivatedRoute,
    protected paymentsService: PaymentService,
    protected router: Router,
  ) {
    super(appService, wordRepository, restaurantRepository, listService, facilityTypesRepository, route, paymentsService, router);
  }
}
