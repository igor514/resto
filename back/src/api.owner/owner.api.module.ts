import {Module} from "@nestjs/common";
import {AdminsModule} from "./admins/admins.module";
import {CurrenciesModule} from "./currencies/currencies.module";
import {LangsModule} from "./langs/langs.module";
import {OrdersModule} from "./orders/orders.module";
import {RestaurantsModule} from "./restaurants/restaurants.module";
import {SettingsModule} from "./settings/settings.module";
import {TransactionsModule} from "./transactions/transactions.module";
import {WordsModule} from "./words/words.module";
import {FacilityTypesModule} from "./facility.types/facility.types.module";
import {WSServersModule} from "./wsservers/wsservers.module";

@Module({
    imports: [
        AdminsModule,
        LangsModule,
        SettingsModule,
        WordsModule,
        RestaurantsModule,
        CurrenciesModule,
        TransactionsModule,
        OrdersModule,
        FacilityTypesModule,
        WSServersModule
    ],
    providers: [],
})
export class OwnerAPIModule {
}
