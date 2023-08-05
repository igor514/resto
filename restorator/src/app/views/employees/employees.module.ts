import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { EmployeeComponent } from "./components/employee/employee.component";
import { CreateEmployeesPage } from "./pages/create/create.employees.page";
import { EditEmployeesPage } from "./pages/edit/edit.employees.page";
import { IndexEmployeesPage } from "./pages/index/index.employees.page";
import { IndexEmployeesService } from "./pages/index/index.employees.service";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexEmployeesPage, pathMatch: "full"},
	{path: "create", component: CreateEmployeesPage, pathMatch: "full"},
	{path: "edit/:id", component: EditEmployeesPage},
	{path: "**", redirectTo: "/employees"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,
        
        routes,
		CCModule,
	],
	declarations: [
		IndexEmployeesPage,
		CreateEmployeesPage,
		EditEmployeesPage,
		EmployeeComponent,
	],    
	providers: [
		IndexEmployeesService,
	]		    
})
export class EmployeesModule {}