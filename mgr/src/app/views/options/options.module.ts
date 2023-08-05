import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OptionsPage } from './options.page';

let routing = RouterModule.forChild ([        
	{path:"", component: OptionsPage, pathMatch: "full"},	
]);

@NgModule({	
    imports: [	
		routing,
		FormsModule,
		CommonModule,
	],
	declarations: [
		OptionsPage,
	],
    providers: [],    
})
export class OptionsModule { }
