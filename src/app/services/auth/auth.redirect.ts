import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})

export class AuthRedirectGuard implements CanActivate {
 constructor(private router: Router, private authService: AuthService){}


canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if(this.authService.isAuthenticated()){
    this.router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
}   
 }

