import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CCModule } from "src/app/common.components/cc.module";
import { AuthGuard } from "src/app/services/auth.guard";
import { GoogleEnteredAuthPage } from "./google-entered/google-entered.auth.page";
import { LoginAuthPage } from "./login/login.auth.page";
import { LogoutAuthPage } from "./logout/logout.auth.page";
import { PasswordAuthPage } from "./password/password.auth.page";

let routes = RouterModule.forChild ([            
	{path: "login", component: LoginAuthPage, pathMatch: "full"},
	{path: "logout", component: LogoutAuthPage, pathMatch: "full"},
	{path: "google-entered", component: GoogleEnteredAuthPage, pathMatch: "full"},
	{path: "password", component: PasswordAuthPage, pathMatch: "full", canActivate: [AuthGuard]},
	{path: "**", redirectTo: "/auth/logout"},
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
		LoginAuthPage,	
		LogoutAuthPage,	
		PasswordAuthPage,
		GoogleEnteredAuthPage,
	],    		    
})
export class AuthModule {}