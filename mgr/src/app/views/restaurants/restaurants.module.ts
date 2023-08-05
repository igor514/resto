import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CCModule } from 'src/app/common.components/cc.module';
import { RestaurantsListPage } from './list/restaurants.list.page';
import { RestaurantsCreatePage } from './create/restaurants.create.page';
import { RestaurantsEditPage } from './edit/restaurants.edit.page';
import { RestaurantComponent } from './restaurant.component';

let routing = RouterModule.forChild ([        
	{path:"", component: RestaurantsListPage, pathMatch: "full"},
	{path:"create", component: RestaurantsCreatePage, pathMatch: "full"},
	{path:"edit/:id", component: RestaurantsEditPage},
]);

@NgModule({	
    imports: [	
		CommonModule,
		FormsModule,		
		CCModule,
		routing,			
	],
	declarations: [
		RestaurantsListPage,
		RestaurantsCreatePage,
		RestaurantsEditPage,
		RestaurantComponent,
	]    
})
export class RestaurantsModule { }
