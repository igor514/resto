import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LangsListPage } from './list/langs.list.page';
import { LangsCreatePage } from './create/langs.create.page';
import { LangComponent } from './lang.component';
import { LangsEditPage } from './edit/langs.edit.page';
import { CCModule } from 'src/app/common.components/cc.module';

let routing = RouterModule.forChild ([        
	{path:"", component: LangsListPage, pathMatch: "full"},
	{path:"create", component: LangsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: LangsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		LangsListPage,
		LangsCreatePage,
		LangsEditPage,
		LangComponent,
	]    
})
export class LangsModule { }
