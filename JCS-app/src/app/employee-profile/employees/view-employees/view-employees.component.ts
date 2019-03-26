import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Auth-services/user.service';
import { AuthService } from 'src/app/Auth-services/auth.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {

  employees: any;
  userRoles: any;
  user: any;

  constructor(private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userRoles = this.authService.setuserRole
    this.user = this.authService.setUserLog

    this.userService.getEmployeesDetails().subscribe(data => {
      this.employees = data.details
    })
  }

}