import { NgModule } from '@angular/core';
import { IndexAllOrdersService } from '../views/orders/pages/all.index/index.all.orders.service';
import { AdminGuard } from './admin.guard';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ErrorService } from './error.service';
import { FilesService } from './files.service';
import { FinanceGuard } from './finance.guard';
import { GoogleService } from './google.service';
import { CatRepository } from './repositories/cat.repository';
import { EmployeeRepository } from './repositories/employee.repository';
import { EmployeeStatusRepository } from './repositories/employee.status.repository';
import { HallRepository } from './repositories/hall.repository';
import { IconRepository } from './repositories/icon.repository';
import { LangRepository } from './repositories/lang.repository';
import { OrderRepository } from './repositories/order.repository';
import { ProductRepository } from './repositories/product.repository';
import { ServingRepository } from './repositories/serving.repository';
import { SettingRepository } from './repositories/setting.repository';
import { StatsRepository } from './repositories/stats.repository';
import { WordRepository } from './repositories/word.repository';
import { WSServerRepository } from './repositories/wsserver.repository';
import { SocketService } from './socket.service';
import { SoundService } from './sound.service';
import {FloorRepository} from './repositories/floor.repository';
import {RoomTypeRepository} from './repositories/room.type.repository';
import {PaymentsService} from "./payments.service";
import {AuthStorage} from "./auth-storage.service";
import {QRRepository} from "./repositories/qr.repository";
import {UnitRepository} from "./repositories/unit.repository";
import {IngredientTypeRepository} from "./repositories/ingredient.type.repository";

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        AuthGuard,
        AdminGuard,
        FinanceGuard,
        AppService,
        DataService,
        ErrorService,
        GoogleService,
        AuthService,
        FilesService,
        SocketService,
        SoundService,
        LangRepository,
        WordRepository,
        SettingRepository,
        EmployeeStatusRepository,
        EmployeeRepository,
        HallRepository,
        CatRepository,
        IconRepository,
        ProductRepository,
        OrderRepository,
        ServingRepository,
        WSServerRepository,
        StatsRepository,
        FloorRepository,
        RoomTypeRepository,
        UnitRepository,
        IngredientTypeRepository,

        QRRepository,
        AuthStorage,
        PaymentsService,
        // этот сервис будет использоваться  в разных модулях, поэтому включим его в модуль,
        // который подключается в главный модуль приложения и один раз
        IndexAllOrdersService,
    ],
})
export class ServicesModule {
}
