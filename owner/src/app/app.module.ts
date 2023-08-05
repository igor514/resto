import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CCModule } from './common.components/cc.module';
import { ServicesModule } from './services/services.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
    	BrowserModule,
		HttpClientModule,

    	AppRoutingModule,
		ServicesModule,
		CCModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
