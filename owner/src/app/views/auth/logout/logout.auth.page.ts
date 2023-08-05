import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "logout-auth-page",
    template: "",
})
export class LogoutAuthPage implements OnInit {
    constructor(
        private authService: AuthService,        
        private router: Router,
        private appService: AppService,
    ) {}

    public async ngOnInit(): Promise<void> {
        await this.appService.pause(1);
        this.authService.logout();            
        this.router.navigateByUrl("/auth/login");
    }
}