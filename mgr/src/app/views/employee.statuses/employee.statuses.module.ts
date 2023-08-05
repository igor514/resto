import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { EmployeeStatusesListPage } from './list/employee.statuses.list.page';
import { EmployeeStatusesCreatePage } from './create/employee.statuses.create.page';
import { EmployeeStatusesEditPage } from './edit/employee.statuses.edit.page';
import { EmployeeStatusComponent } from './employee.status.component';

let routing = RouterModule.forChild ([        
	{path:"", component: EmployeeStatusesListPage, pathMatch: "full"},
	{path:"create", component: EmployeeStatusesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: EmployeeStatusesEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		EmployeeStatusesListPage,
		EmployeeStatusesCreatePage,
		EmployeeStatusesEditPage,
		EmployeeStatusComponent,
	]    
})
export class EmployeeStatusesModule { }
