import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { RechargeComponent } from "./components/recharge/recharge.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { ActiveRestaurantsPage } from "./pages/active/active.restaurants.page";
import { ActiveRestaurantsService } from "./pages/active/active.restaurants.service";
import { CreateRestaurantsPage } from "./pages/create/create.restaurants.page";
import { EditRestaurantsPage } from "./pages/edit/edit.restaurants.page";
import { InactiveRestaurantsPage } from "./pages/inactive/inactive.restaurants.page";
import { InactiveRestaurantsService } from "./pages/inactive/inactive.restaurants.service";
import { OrdersRestaurantsPage } from "./pages/orders/orders.restaurants.page";
import { TransactionsRestaurantsPage } from "./pages/transactions/transactions.restaurants.page";

let routes = RouterModule.forChild ([            
	{path: "active", component: ActiveRestaurantsPage, pathMatch: "full"},
	{path: "inactive", component: InactiveRestaurantsPage, pathMatch: "full"},
	{path: ":type/create", component: CreateRestaurantsPage, pathMatch: "full"},
	{path: ":type/edit/:id", component: EditRestaurantsPage},
	{path: ":type/transactions/:id", component: TransactionsRestaurantsPage},
	{path: ":type/orders/:id", component: OrdersRestaurantsPage},
	{path: "**", redirectTo: "/restaurants/active"},
]);

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,        
        routes,
		CCModule,
	],
	declarations: [		
		ActiveRestaurantsPage,
		InactiveRestaurantsPage,
		CreateRestaurantsPage,
		EditRestaurantsPage,
		TransactionsRestaurantsPage,
		OrdersRestaurantsPage,
		RestaurantComponent,
		RechargeComponent,
	],  
	providers: [
		ActiveRestaurantsService,
		InactiveRestaurantsService,
	],  		    
})
export class RestaurantsModule {}