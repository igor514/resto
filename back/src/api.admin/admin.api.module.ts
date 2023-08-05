import { Module } from "@nestjs/common";

import { AdminsModule } from "./admins/admins.module";
import { AdmingroupsModule } from "./admingroups/admingroups.module";
import { ObjectsModule } from "./objects/objects.module";
import { FilesModule } from "./files/files.module";
import { SettingsModule } from "./settings/settings.module";
import { LangsModule } from "./langs/langs.module";
import { WordbooksModule } from "./wordbooks/wordbooks.module";
import { MailtemplatesModule } from "./mailtemplates/mailtemplates.module";
import { CurrenciesModule } from "./currencies/currencies.module";
import { EmployeeStatusesModule } from "./employee.statuses/employee.statuses.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { EmployeesModule } from "./employees/employees.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { HallsModule } from "./halls/halls.module";
import { IconsModule } from "./icons/icons.module";
import { CatsModule } from "./cats/cats.module";
import { ProductsModule } from "./products/products.module";
import { ServingsModule } from "./servings/servings.module";
import { OrdersModule } from "./orders/orders.module";
import { WSServersModule } from "./wsservers/wsservers.module";
import {RoomTypesModule} from "./room.types/room.types.module";
import {FloorModule} from "./floor/floor.module";
import {FacilityTypesModule} from "./facility.types/facility.types.module";
import {LogsModule} from "./logs/logs.module";
import {UnitsModule} from "./units/units.module";
import {IngredientsModule} from "./ingredients/ingredients.module";

@Module({
    imports: [        
        ObjectsModule,
        FilesModule,
        AdminsModule,
        AdmingroupsModule,            
        SettingsModule,
        LangsModule,
        WordbooksModule,        
        MailtemplatesModule,    
        CurrenciesModule,
        EmployeesModule,
        EmployeeStatusesModule,        
        RestaurantsModule,        
        TransactionsModule,
        HallsModule,
        IconsModule,
        CatsModule,
        ProductsModule,
        ServingsModule,
        OrdersModule,
        WSServersModule,
        RoomTypesModule,
        FloorModule,
        FacilityTypesModule,
        LogsModule,
        UnitsModule,
        IngredientsModule
    ],
    providers: [],
})
export class AdminAPIModule {}
