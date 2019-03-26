import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../Auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MachineEdit implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.getUserLog().pipe(map(res => {
        this.authService.setUser(res.user)
        for (let i = 0; i < res.userRole.length; i++) {
          if (res.userRole[i].roleId.roleNumber === 9) {
            console.log(res.userRole[i].roleId.roleNumber)
            this.authService.setUserRole(res.userRole)
            return true
          }
        }
          this.router.navigate(['login'])
          return false
      }));
  }
}
