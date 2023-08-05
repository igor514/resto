import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {AuthGuard} from './services/auth.guard';
import {AuthModule} from './views/auth/auth.module';
import {AdminsModule} from './views/admins/admins.module';
import {SettingsModule} from './views/settings/settings.module';
import {LangsModule} from './views/langs/langs.module';
import {WordbooksModule} from './views/wordbooks/wordbooks.module';
import {OptionsModule} from './views/options/options.module';
import {MailtemplatesModule} from './views/mailtemplates/mailtemplates.module';
import {CurrenciesModule} from './views/currencies/currencies.module';
import {EmployeeStatusesModule} from './views/employee.statuses/employee.statuses.module';
import {RestaurantsModule} from './views/restaurants/restaurants.module';
import {EmployeesModule} from './views/employees/employees.module';
import {TransactionsModule} from './views/transactions/transactions.module';
import {HallsModule} from './views/halls/halls.module';
import {IconsModule} from './views/icons/icons.module';
import {CatsModule} from './views/cats/cats.module';
import {ProductsModule} from './views/products/products.module';
import {ServingsModule} from './views/servings/servings.module';
import {OrdersModule} from './views/orders/orders.module';
import {WSServersModule} from './views/wsservers/wsservers.module';
import {RoomTypesModule} from './views/room.types/room.types.module';
import {FloorsModule} from './views/floors/floors.module';
import {FacilityTypesModule} from "./views/facility.types/facility.types.module";
import {LogsModule} from "./views/logs/logs.module";
import {UnitsModule} from "./views/units/units.module";
import {PaymentSettingsModule} from './views/payment.settings/payment.settings.module';
import {IngredientsModule} from "./views/ingredients.types/ingredients.module";

const routes: Routes = [
  {path: '', redirectTo: '/settings', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => AuthModule},
  {path: 'options', loadChildren: () => OptionsModule, canActivate: [AuthGuard]},
  {path: 'settings', loadChildren: () => SettingsModule, canActivate: [AuthGuard]},
  {path: 'settings/payments', loadChildren: () => PaymentSettingsModule, canActivate: [AuthGuard]},
  {path: 'admins', loadChildren: () => AdminsModule, canActivate: [AuthGuard]},
  {path: 'localization/langs', loadChildren: () => LangsModule, canActivate: [AuthGuard]},
  {path: 'localization/wordbooks', loadChildren: () => WordbooksModule, canActivate: [AuthGuard]},
  {path: 'localization/currencies', loadChildren: () => CurrenciesModule, canActivate: [AuthGuard]},
  {path: 'restaurants/restaurants', loadChildren: () => RestaurantsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/employees', loadChildren: () => EmployeesModule, canActivate: [AuthGuard]},
  {path: 'restaurants/employee-statuses', loadChildren: () => EmployeeStatusesModule, canActivate: [AuthGuard]},
  {path: 'restaurants/room-types', loadChildren: () => RoomTypesModule, canActivate: [AuthGuard]},
  {path: 'restaurants/units', loadChildren: () => UnitsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/facility-types', loadChildren: () => FacilityTypesModule, canActivate: [AuthGuard]},
  {path: 'restaurants/halls', loadChildren: () => HallsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/floors', loadChildren: () => FloorsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/transactions', loadChildren: () => TransactionsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/icons', loadChildren: () => IconsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/cats', loadChildren: () => CatsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/products', loadChildren: () => ProductsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/ingredients', loadChildren: () => IngredientsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/servings', loadChildren: () => ServingsModule, canActivate: [AuthGuard]},
  {path: 'restaurants/orders', loadChildren: () => OrdersModule, canActivate: [AuthGuard]},
  {path: 'utils/auth-logs', loadChildren: () => LogsModule, canActivate: [AuthGuard]},
  {path: 'utils/mailtemplates', loadChildren: () => MailtemplatesModule, canActivate: [AuthGuard]},
  {path: 'utils/wsservers', loadChildren: () => WSServersModule, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/settings'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
