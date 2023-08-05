import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NotfoundErrorsPage } from "./notfound/notfound.errors.page";

let routes = RouterModule.forChild ([            
	{path: "404", component: NotfoundErrorsPage, pathMatch: "full"},
	{path: "**", redirectTo: "/table/null"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,
        
        routes,		
	],
	declarations: [
		NotfoundErrorsPage,
	],    		    
})
export class ErrorsModule {}