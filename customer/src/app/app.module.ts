import {HttpClientModule} from '@angular/common/http';
import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CCModule} from './common.components/cc.module';
import {ServicesModule} from './services/services.module';
import {HomeModule} from './views/home/home.module';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './views/home/home.page';
import {MenuModule} from './views/menu/menu.module';
import {ErrorsModule} from './views/errors/errors.module';
import {OrderService} from './services/order.service';
import {OrderHotelService} from './services/order.hotel.service';
import {STATIC_TOKEN} from "./tokens";
import {environment} from "../environments/environment";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/table/null'},
  {path: 'room/:table_code', component: HomePage},
  {path: 'room/:table_code/menu', loadChildren: () => MenuModule},
  {path: 'room/:table_code/error', loadChildren: () => ErrorsModule},
  {path: 'table/:table_code', component: HomePage},
  {path: 'table/:table_code/menu', loadChildren: () => MenuModule},
  {path: 'table/:table_code/error', loadChildren: () => ErrorsModule},
  {path: '**', redirectTo: '/table/null'},
];

const STATIC_PATH = `${environment.api_url}/images/`;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ServicesModule,
    CCModule,
    HomeModule,
  ],
  providers: [
    OrderService,
    OrderHotelService,
    {provide: STATIC_TOKEN, useValue: STATIC_PATH},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
