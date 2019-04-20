import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth-services/auth.service';
import { UserProfileComponent } from "../employee-profile/user-profile/user-profile.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
  userRoles: any;
  canEmployee = false
  employeeDivider = false

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.user = this.authService.setUserLog
    this.userRoles = this.authService.setuserRole

    for (let i = 0; i < this.userRoles.length; i++) {
      if (this.userRoles[i].roleId.roleNumber == 1 || this.userRoles[i].roleId.roleNumber == 3) {
        this.canEmployee = true
      }
    }

    for (let i = 0; i < this.userRoles.length; i++) {
      for (let j = 0; j < this.userRoles.length; j++) {
        if (this.userRoles[i].roleId.roleNumber == 1 && this.userRoles[j].roleId.roleNumber == 3) {
          this.employeeDivider = true
        }
      }
    }

    /*this.authService.getUserLog().subscribe(data => {
      this.authService.setUserRole(data.userRole)
      //console.log(data.status)
    })*/
  }

  reload() {
    UserProfileComponent.caller(this.ngOnInit)
  }

}