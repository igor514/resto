import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { HomeModule } from "./views/home/home.module";
import { HttpClientModule } from '@angular/common/http';
import { CCModule } from './common.components/cc.module';
import {STATIC_TOKEN} from "./tokens";
import {environment} from "../environments/environment";

const STATIC_PATH = `${environment.api_url}/images/`;
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		HttpClientModule,

		AppRoutingModule,
		ServicesModule,
		CCModule,
		HomeModule,
	],
  providers: [{provide: STATIC_TOKEN, useValue: STATIC_PATH}],
	bootstrap: [AppComponent]
})
export class AppModule { }
