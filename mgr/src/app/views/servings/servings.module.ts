import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { ServingsListPage } from './list/servings.list.page';
import { ServingsCreatePage } from './create/servings.create.page';
import { ServingsEditPage } from './edit/servings.edit.page';
import { ServingComponent } from './serving.component';

let routing = RouterModule.forChild ([        
	{path:"", component: ServingsListPage, pathMatch: "full"},
	{path:"create", component: ServingsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: ServingsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		ServingsListPage,
		ServingsCreatePage,
		ServingsEditPage,
		ServingComponent,
	]    
})
export class ServingsModule { }
