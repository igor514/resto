import {NgModule} from '@angular/core';

import {AppService} from './app.service';
import {DataService} from './data.service';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {ErrorService} from './error.service';
import {AdmingroupRepository} from './repositories/admingroup.repository';
import {AdminRepository} from './repositories/admin.repository';
import {AdmLangRepository} from './repositories/admlang.repository';
import {SlugService} from './slug.service';
import {SettingRepository} from "./repositories/setting.repository";
import {LangRepository} from './repositories/lang.repository';
import {WordbookRepository} from './repositories/wordbook.repository';
import {MailtemplateRepository} from './repositories/mailtemplate.repository';
import {CurrencyRepository} from './repositories/currency.repository';
import {EmployeeStatusRepository} from './repositories/employee.status.repository';
import {RestaurantRepository} from './repositories/restaurant.repository';
import {EmployeeRepository} from './repositories/employee.repository';
import {TransactionRepository} from './repositories/transaction.repository';
import {HallRepository} from './repositories/hall.repository';
import {HallRepository2} from './repositories/hall.repository2';
import {IconRepository} from './repositories/icon.repository';
import {CatRepository} from './repositories/cat.repository';
import {ProductRepository} from './repositories/product.repository';
import {FilesService} from './files.service';
import {ServingRepository} from './repositories/serving.repository';
import {OrderRepository} from './repositories/order.repository';
import {EmployeeRepository2} from './repositories/employee.repository2';
import {WSServerRepository} from './repositories/wsserver.repository';
import {RoomTypeRepository} from "./repositories/room.type.repository";
import {FloorRepository} from "./repositories/floor.repository";
import {FacilityTypeRepository} from "./repositories/facility.type.repository";
import {PaymentService} from "./payment.service";
import {LogRepository} from "./repositories/logs.repository";
import {UnitRepository} from "./repositories/unit.repository";
import {IngredientTypeRepository} from "./repositories/ingredient-type.repository";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    AppService,
    ErrorService,
    DataService,
    AdmLangRepository,
    AuthService,
    AuthGuard,
    FilesService,
    SlugService,
    AdmingroupRepository,
    AdminRepository,
    SettingRepository,
    LangRepository,
    WordbookRepository,
    MailtemplateRepository,
    CurrencyRepository,
    EmployeeRepository,
    EmployeeRepository2,
    EmployeeStatusRepository,
    RestaurantRepository,
    TransactionRepository,
    HallRepository,
    HallRepository2,
    IconRepository,
    CatRepository,
    ProductRepository,
    ServingRepository,
    OrderRepository,
    WSServerRepository,
    RoomTypeRepository,
    FloorRepository,
    FacilityTypeRepository,
    LogRepository,
    PaymentService,
    UnitRepository,
    IngredientTypeRepository,
  ],
})
export class ServicesModule {
}
