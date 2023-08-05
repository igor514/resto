import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { OrdersListPage } from './list/orders.list.page';
import { OrdersEditPage } from './edit/orders.edit.page';
import { OrderComponent } from './order.component';

let routing = RouterModule.forChild ([        
	{path:"", component: OrdersListPage, pathMatch: "full"},
	{path:"edit/:id", component: OrdersEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		OrdersListPage,
		OrdersEditPage,
		OrderComponent,
	]    
})
export class OrdersModule { }
