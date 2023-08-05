import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { FloorsListPage } from './list/floors.list.page';
import { FloorsCreatePage } from './create/floors.create.page';
import { FloorsEditPage } from './edit/floors.edit.page';
import { FloorsComponent } from './floors.component';

let routing = RouterModule.forChild ([
	{path:"", component: FloorsListPage, pathMatch: "full"},
	{path:"create", component: FloorsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: FloorsEditPage},
]);

@NgModule({
    imports: [
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		FloorsListPage,
		FloorsCreatePage,
		FloorsEditPage,
		FloorsComponent,
	]
})
export class FloorsModule { }
