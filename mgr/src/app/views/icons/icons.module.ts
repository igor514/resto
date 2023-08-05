import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { IconsListPage } from './list/icons.list.page';
import { IconsCreatePage } from './create/icons.create.page';
import { IconsEditPage } from './edit/icons.edit.page';
import { IconComponent } from './icon.component';

let routing = RouterModule.forChild ([
	{path:"", component: IconsListPage, pathMatch: "full"},
	{path:"create", component: IconsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: IconsEditPage},
]);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CCModule,
        routing,
        CommonModule,
        FormsModule,
    ],
	declarations: [
		IconsListPage,
		IconsCreatePage,
		IconsEditPage,
		IconComponent,
	]
})
export class IconsModule { }
