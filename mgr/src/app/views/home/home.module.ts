import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePage } from './home.page';
import { CCModule } from '../../common.components/cc.module';

@NgModule({	
    imports: [	
		CommonModule,
		CCModule,
	],
	declarations: [
		HomePage,		
	],
    providers: [		
	],    
})
export class HomeModule { }
