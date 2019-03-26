import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SetRoleService } from 'src/app/Auth-services/set-role.service';
import { ProfileTypeService } from 'src/app/Auth-services/profileType.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-set-roles',
  templateUrl: './set-roles.component.html',
  styleUrls: ['./set-roles.component.css']
})
export class SetRolesComponent implements OnInit {

  id: any;
  employeeRoles: any;
  employeeType: any;
  roleId: any;
  myForm: any;
  store = false;

  constructor(
    private route: ActivatedRoute,
    private profileTypeService: ProfileTypeService,
    private setRoleService: SetRoleService,
    private location: Location,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id')

    this.setRoleService.getEmployeeRolesDetails(this.id).subscribe(data => {
      this.employeeRoles = data.setRolesForAType
      // console.log(this.employeeRoles)
      this.setValue()
    })

    this.profileTypeService.getEmployeeTypeDetails(this.id).subscribe(data => {
      this.employeeType = data.employeeTypeDetails
    })

    this.myForm = new FormGroup({
      check0: new FormControl(''),
      check1: new FormControl(''),
      check2: new FormControl(''),
      check3: new FormControl(''),
      check4: new FormControl(''),
      check5: new FormControl(''),
      check6: new FormControl(''),
      check7: new FormControl(''),
      check8: new FormControl(''),
      check9: new FormControl(''),
      check10: new FormControl(''),
    })
  }

  goBack(): void {
    this.location.back();
  }

  setValue() {
    this.myForm.controls['check0'].setValue(this.employeeRoles[0].status);
    this.myForm.controls['check1'].setValue(this.employeeRoles[1].status);
    this.myForm.controls['check2'].setValue(this.employeeRoles[2].status);
    this.myForm.controls['check3'].setValue(this.employeeRoles[3].status);
    this.myForm.controls['check4'].setValue(this.employeeRoles[4].status);
    this.myForm.controls['check5'].setValue(this.employeeRoles[5].status);
    this.myForm.controls['check6'].setValue(this.employeeRoles[6].status);
    this.myForm.controls['check7'].setValue(this.employeeRoles[7].status);
    this.myForm.controls['check8'].setValue(this.employeeRoles[8].status);
    this.myForm.controls['check9'].setValue(this.employeeRoles[9].status);
    this.myForm.controls['check10'].setValue(this.employeeRoles[10].status);
  }

  setRole(value) {

    this.store = true

    this.employeeRoles[0].status = value.check0
    this.employeeRoles[1].status = value.check1
    this.employeeRoles[2].status = value.check2
    this.employeeRoles[3].status = value.check3
    this.employeeRoles[4].status = value.check4
    this.employeeRoles[5].status = value.check5
    this.employeeRoles[6].status = value.check6
    this.employeeRoles[7].status = value.check7
    this.employeeRoles[8].status = value.check8
    this.employeeRoles[9].status = value.check9
    this.employeeRoles[10].status = value.check10

    this.setRoleService.setRoles(this.id, this.employeeRoles).subscribe(data => {
      if (data.success) {
        this.router.navigate(['userType'])
        window.alert(data.message)
        this.store = false
      } else {
        window.alert(data.message)
      }
    })

  }

}
