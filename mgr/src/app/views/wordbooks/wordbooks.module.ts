import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { WordbooksListPage } from './list/wordbooks.list.page';
import { WordbookComponent } from './wordbook.component';
import { WordbooksEditPage } from './edit/wordbooks.edit.page';
import { WordbooksCreatePage } from './create/wordbooks.create.page';

let routing = RouterModule.forChild ([        
	{path:"", component: WordbooksListPage, pathMatch: "full"},
	{path:"create", component: WordbooksCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: WordbooksEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		WordbooksListPage,	
		WordbooksEditPage,
		WordbooksCreatePage,
		WordbookComponent,	
	]    
})
export class WordbooksModule { }
