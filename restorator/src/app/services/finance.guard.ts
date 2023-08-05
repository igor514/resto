import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FinanceGuard {    
    constructor (
        private authService: AuthService,
        private router: Router,
    ) { }
    
    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {        
        if (this.authService.authData.value.employee.restaurant.money >= 0) {
            return true;
        } else {
            this.router.navigateByUrl ("/");
            return false;
        }        
    }    
}
