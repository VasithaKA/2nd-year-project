import { Component, OnInit } from '@angular/core';
import { ProfileTypeService } from 'src/app/Auth-services/profileType.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Auth-services/auth.service';

@Component({
  selector: 'app-create-user-type',
  templateUrl: './create-user-type.component.html',
  styleUrls: ['./create-user-type.component.css']
})
export class CreateUserTypeComponent implements OnInit {

  employeeTypes: any;
  userCanDos: any

  constructor(
    private profileTypeService: ProfileTypeService,
    private router: Router,
    private location: Location,
    private authService: AuthService) { }

  ngOnInit() {
    this.userCanDos = this.authService.setuserRole
    this.profileTypeService.getEmployeeType().subscribe(data => {
      this.employeeTypes = data.details
    })
  }

  goBack(): void {
    this.location.back();
  }

  formUserType = new FormGroup({
    employeeTypeName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ], this.shouldBeUnique(this.profileTypeService))
  })

  get employeeTypeName() {
    return this.formUserType.get('employeeTypeName')
  }

  shouldBeUnique(profileTypeService: ProfileTypeService){
    return (control: AbstractControl) => {
      control = control.value.trim() ? control.value.trim().charAt(0).toUpperCase() + control.value.trim().substr(1).toLowerCase() : '';
      return profileTypeService.isemployeeTypeName(control).pipe(map(res => {
        return res.unique ? { shouldBeUnique: true } : null;
      }));
    }
  }

  addUserType(event) {
    event.preventDefault()
    const employeeType = event.target.querySelector('#employeeTypeName').value
    const employeeTypeName = employeeType.trim() ? employeeType.trim().charAt(0).toUpperCase() + employeeType.trim().substr(1).toLowerCase() : '';
    if (this.employeeTypeName.errors === null) {
      this.profileTypeService.addEmployeeType(employeeTypeName).subscribe(data => {
        if (data.success) {
          this.router.navigate(['userType'])
          window.alert(data.message)
          this.ngOnInit()
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(this.employeeTypeName.errors)
    }
  }

}
