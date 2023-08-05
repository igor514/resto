import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { AdminsListPage } from "./list/admins.list.page";
import { AdminsCreatePage } from "./create/admins.create.page";
import { AdminsEditPage } from "./edit/admins.edit.page";
import { AdminComponent } from "./admin.component";

let routing = RouterModule.forChild ([        
	{path:"", component: AdminsListPage, pathMatch: "full"},
	{path:"create", component: AdminsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: AdminsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		AdminsListPage,
		AdminsCreatePage,
		AdminsEditPage,
		AdminComponent,
	],    
})
export class AdminsModule { }
