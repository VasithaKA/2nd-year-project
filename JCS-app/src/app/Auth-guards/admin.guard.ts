import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../Auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /*if (this.profileTypeService.setTypeStatus === 'admin') {
        console.log(this.profileTypeService.setTypeStatus)
        return true
      }*/
      return this.authService.getUserLog().pipe(map(res => {
        if (res.user.userTypeId.userTypeId === "admin") {
          console.log(res.user.userTypeId.userTypeId)
          this.authService.setUser(res.user)
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }));
  }
}
