import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { ProductsListPage } from './list/products.list.page';
import { ProductsCreatePage } from './create/products.create.page';
import { ProductsEditPage } from './edit/products.edit.page';
import { ProductComponent } from './product.component';

let routing = RouterModule.forChild ([        
	{path:"", component: ProductsListPage, pathMatch: "full"},
	{path:"create", component: ProductsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: ProductsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		ProductsListPage,
		ProductsCreatePage,
		ProductsEditPage,
		ProductComponent,
	]    
})
export class ProductsModule { }
