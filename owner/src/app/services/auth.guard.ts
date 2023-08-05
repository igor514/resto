import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard {
  public nextUrl: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.authData !== null) {
      return true;
    } else {
      this.router.navigateByUrl("/auth/login");
      return false;
    }
  }
}
