import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CCModule} from './common.components/cc.module';
import {ServicesModule} from './services/services.module';
import {HomeModule} from './views/home/home.module';
import {environment} from '../environments/environment';
import {STATIC_TOKEN} from './tokens';

const STATIC_PATH = `${environment.api_url}/images/`;

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ServicesModule,
        CCModule,
        HomeModule,
        CCModule,
    ],
  providers: [{provide: STATIC_TOKEN, useValue: STATIC_PATH}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
