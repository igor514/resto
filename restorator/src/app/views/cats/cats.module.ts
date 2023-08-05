import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { CatComponent } from "./components/cat/cat.component";
import { CreateCatsPage } from "./pages/create/create.cats.page";
import { EditCatsPage } from "./pages/edit/edit.cats.page";
import { IndexCatsPage } from "./pages/index/index.cats.page";
import { IndexCatsService } from "./pages/index/index.cats.service";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexCatsPage, pathMatch: "full"},
	{path: "create", component: CreateCatsPage, pathMatch: "full"},
	{path: "edit/:id", component: EditCatsPage},
	{path: "**", redirectTo: "/kitchen/cats"},
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
		IndexCatsPage,		
		CreateCatsPage,
		EditCatsPage,
		CatComponent,
	],    	
	providers: [
		IndexCatsService,
	]	    
})
export class CatsModule {}