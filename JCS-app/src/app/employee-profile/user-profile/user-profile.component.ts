import { Component, OnInit } from '@angular/core';
import { ProfileTypeService } from 'src/app/Auth-services/profileType.service';
import { UserService } from 'src/app/Auth-services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MachineService } from 'src/app/Auth-services/machine.service';
import { SetRoleService } from 'src/app/Auth-services/set-role.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-management',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  userRoles: any;
  experts: any;
  id: any;
  machines: any;
  machineLength: any;
  expertsLength: any;

  constructor(
    private profileTypeService: ProfileTypeService,
    private userService: UserService,
    private route: ActivatedRoute,
    private machineService: MachineService,
    private setRoleService: SetRoleService,
    private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getEmployeeDetails(this.id).subscribe(data => {
      this.user = data.aEmpDetails
      this.setRolesForUser()
    })

    this.profileTypeService.getExpetiseDetails(this.id).subscribe(data => {
      this.experts = data.expert
      this.expertsLength = this.experts.length
    })

    this.machineService.getMachineBySupevisor(this.id).subscribe(data => {
      this.machines = data.details
      this.machineLength = this.machines.length
    })
  }

  goBack(): void {
    this.location.back();
  }

  setRolesForUser() {
    this.setRoleService.getTrueRolesForAType(this.user.employeeTypeId._id).subscribe(data => {
      this.userRoles = data.details
    })
  }

}
