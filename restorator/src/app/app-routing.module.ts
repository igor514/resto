import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from './services/admin.guard';
import {AuthGuard} from './services/auth.guard';
import {AuthModule} from './views/auth/auth.module';
import {CatsModule} from './views/cats/cats.module';
import {EmployeesModule} from './views/employees/employees.module';
import {HallsModule} from './views/halls/halls.module';
import {HomePage} from './views/home/home.page';
import {OrdersModule} from './views/orders/orders.module';
import {ProductsModule} from './views/products/products.module';
import {StatsModule} from './views/stats/stats.module';
import {TablesModule} from './views/tables/tables.module';
import {FloorsModule} from './views/floors/floors.module';
import {RoomsModule} from './views/rooms/rooms.module';
import {IngredientsModule} from "./views/ingredients/ingredients.module";

const routes: Routes = [
  {path: '', component: HomePage, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => AuthModule},
  {path: 'employees', loadChildren: () => EmployeesModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'halls-tables/halls', loadChildren: () => HallsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'halls-tables/tables', loadChildren: () => TablesModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'floors-rooms/floors', loadChildren: () => FloorsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'floors-rooms/rooms', loadChildren: () => RoomsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'kitchen/cats', loadChildren: () => CatsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'kitchen/products', loadChildren: () => ProductsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'kitchen/ingredients', loadChildren: () => IngredientsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: 'orders', loadChildren: () => OrdersModule, canActivate: [AuthGuard]},
  {path: 'stats', loadChildren: () => StatsModule, canActivate: [AuthGuard, AdminGuard]},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
