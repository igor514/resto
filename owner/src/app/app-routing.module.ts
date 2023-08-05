import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthModule } from './views/auth/auth.module';
import { RestaurantsModule } from './views/restaurants/restaurants.module';

const routes: Routes = [
	{path: "", redirectTo: "/restaurants/active", pathMatch: "full"},
	{path: "auth", loadChildren: () => AuthModule}, 	
	{path: "restaurants", loadChildren: () => RestaurantsModule, canActivate: [AuthGuard]}, 	
	{path: "**", redirectTo: "/restaurants/active"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
