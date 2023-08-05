import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { CCModule } from 'src/app/common.components/cc.module';
import { MailtemplatesListPage } from './list/mailtemplates.list.page';
import { MailtemplatesCreatePage } from './create/mailtemplates.create.page';
import { MailtemplatesEditPage } from './edit/mailtemplates.edit.page';
import { MailtemplateComponent } from './mailtemplate.component';

let routing = RouterModule.forChild ([        
	{path:"", component: MailtemplatesListPage, pathMatch: "full"},
	{path:"create", component: MailtemplatesCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: MailtemplatesEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,	
		CKEditorModule,	
	],
	declarations: [
		MailtemplatesListPage,
		MailtemplatesCreatePage,
		MailtemplatesEditPage,
		MailtemplateComponent,
	]    
})
export class MailtemplatesModule { }
