import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../Auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /*if (!!this.profileTypeService.setTypeStatus) {
        console.log(this.profileTypeService.setTypeStatus)
        return true
      }*/
      return this.authService.getUserLog().pipe(map(res => {
        if (res.user) {
          this.authService.setUser(res.user)
          this.authService.setUserRole(res.userRole)
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }));
  }
}
