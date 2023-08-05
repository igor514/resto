import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { HallsListPage } from './list/halls.list.page';
import { HallsCreatePage } from './create/halls.create.page';
import { HallsEditPage } from './edit/halls.edit.page';
import { HallComponent } from './hall.component';

let routing = RouterModule.forChild ([        
	{path:"", component: HallsListPage, pathMatch: "full"},
	{path:"create", component: HallsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: HallsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		HallsListPage,
		HallsCreatePage,
		HallsEditPage,
		HallComponent,
	]    
})
export class HallsModule { }
