import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { CurrenciesListPage } from './list/currencies.list.page';
import { CurrenciesCreatePage } from './create/currencies.create.page';
import { CurrenciesEditPage } from './edit/currencies.edit.page';
import { CurrencyComponent } from './currency.component';

let routing = RouterModule.forChild ([        
	{path:"", component: CurrenciesListPage, pathMatch: "full"},
	{path:"create", component: CurrenciesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CurrenciesEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		CurrenciesListPage,
		CurrenciesCreatePage,
		CurrenciesEditPage,
		CurrencyComponent,
	]    
})
export class CurrenciesModule { }
