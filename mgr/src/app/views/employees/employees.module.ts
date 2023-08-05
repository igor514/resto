import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { EmployeesListPage } from './list/employees.list.page';
import { EmployeesCreatePage } from './create/employees.create.page';
import { EmployeesEditPage } from './edit/employees.edit.page';
import { EmployeeComponent } from './employee.component';

let routing = RouterModule.forChild ([        
	{path:"", component: EmployeesListPage, pathMatch: "full"},
	{path:"create", component: EmployeesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: EmployeesEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		EmployeesListPage,
		EmployeesCreatePage,
		EmployeesEditPage,
		EmployeeComponent,
	]    
})
export class EmployeesModule { }
