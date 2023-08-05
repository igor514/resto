import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { LogsListPage } from './list/logs.list.page';

let routing = RouterModule.forChild ([
	{path:"", component: LogsListPage, pathMatch: "full"},
]);

@NgModule({
    imports: [
		CommonModule,
		FormsModule,
		CCModule,
		routing,
	],
	declarations: [
		LogsListPage,
	]
})
export class LogsModule { }
