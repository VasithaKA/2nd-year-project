import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileTypeService } from 'src/app/Auth-services/profileType.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user-type',
  templateUrl: './edit-user-type.component.html',
  styleUrls: ['./edit-user-type.component.css']
})
export class EditUserTypeComponent implements OnInit {

  id: any;
  employeeType: any;

  constructor(
    private route: ActivatedRoute,
    private profileTypeService: ProfileTypeService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.profileTypeService.getEmployeeTypeDetails(this.id).subscribe(data => {
      this.employeeType = data.employeeTypeDetails
      this.fillUserTypeDetails()
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
        return (res.unique && this.employeeType.employeeTypeName != control) ? { shouldBeUnique: true } : null;
      }));
    }
  }

  fillUserTypeDetails(){
    this.formUserType.controls['employeeTypeName'].setValue(this.employeeType.employeeTypeName)
  }

  updateUserType(event){
    event.preventDefault()
    const employeeType = event.target.querySelector('#employeeTypeName').value
    const employeeTypeName = employeeType.trim() ? employeeType.trim().charAt(0).toUpperCase() + employeeType.trim().substr(1).toLowerCase() : '';

    if (this.employeeTypeName.errors === null) {
      this.profileTypeService.updateEmployeeTypeName(this.id, employeeTypeName).subscribe(data => {
        if (data.success) {
          this.router.navigate(['userType'])
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(this.employeeTypeName.errors)
    }
  }

  deleteUserType(){
    this.profileTypeService.deleteUserType(this.id).subscribe(data => {
      if (data.success) {
        this.router.navigate(['userType'])
        window.alert("UserType has been deleted")
      } else {
        window.alert(data.message)
      }
    })
  }

}
