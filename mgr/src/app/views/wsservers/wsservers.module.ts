import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from '../../common.components/cc.module';
import { WSServersListPage } from "./list/wsservers.list.page";
import { WSServersCreatePage } from "./create/wsservers.create.page";
import { WSServerComponent } from "./wsserver.component";

let routing = RouterModule.forChild ([        
	{path:"", component: WSServersListPage, pathMatch: "full"},
	{path:"create", component: WSServersCreatePage, pathMatch: "full"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		WSServersListPage,
		WSServersCreatePage,		
		WSServerComponent,
	],    
})
export class WSServersModule { }
