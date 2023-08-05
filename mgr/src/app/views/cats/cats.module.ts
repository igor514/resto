import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { CatsListPage } from './list/cats.list.page';
import { CatsCreatePage } from './create/cats.create.page';
import { CatsEditPage } from './edit/cats.edit.page';
import { CatComponent } from './cat.component';

let routing = RouterModule.forChild ([        
	{path:"", component: CatsListPage, pathMatch: "full"},
	{path:"create", component: CatsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: CatsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		CatsListPage,
		CatsCreatePage,
		CatsEditPage,
		CatComponent,
	]    
})
export class CatsModule { }
