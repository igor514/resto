import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { HallComponent } from "./components/hall/hall.component";
import { CreateHallsPage } from "./pages/create/create.halls.page";
import { EditHallsPage } from "./pages/edit/edit.halls.page";
import { IndexHallsPage } from "./pages/index/index.halls.page";
import { IndexHallsService } from "./pages/index/index.halls.service";

let routes = RouterModule.forChild ([            
	{path: "", component: IndexHallsPage, pathMatch: "full"},
	{path: "create", component: CreateHallsPage, pathMatch: "full"},
	{path: "edit/:id", component: EditHallsPage},
	{path: "**", redirectTo: "/halls"},
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
		IndexHallsPage,
		CreateHallsPage,
		EditHallsPage,
		HallComponent,
	],    
	providers: [
		IndexHallsService,
	],
})
export class HallsModule {}