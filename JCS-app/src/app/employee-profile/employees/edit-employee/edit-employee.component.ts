import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, AsyncValidatorFn } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Auth-services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileTypeService } from 'src/app/Auth-services/profileType.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DepartmentService } from 'src/app/Auth-services/department.service';
import { StringValidators } from "../../../common-validators/StringValidators";
import { Location } from '@angular/common';
import { AuthService } from 'src/app/Auth-services/auth.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: any;
  id: any;
  employeeTypes: any;
  imageUrl: String;
  profilePicture: File = null;
  changingImage = false;
  imageChangedEvent: any;
  croppedImage: any;
  picture: any = null;
  changepassword = false;
  isNotMatch: boolean;
  departments: any;
  user: any;

  constructor(
    private userService: UserService,
    private authService:AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private profileTypeService: ProfileTypeService,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.user = this.authService.setUserLog
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getEmployeeDetails(this.id).subscribe(data => {
      this.employee = data.aEmpDetails
      this.imageUrl = "http://localhost:5000/" + data.aEmpDetails.profilePicture

      this.profileTypeService.getEmployeeType().subscribe(data => {
        this.employeeTypes = data.details
        for (let i = 0; i < this.employeeTypes.length; i++) {
          if (this.employeeTypes[i]._id == this.employee.employeeTypeId._id) {
            this.employeeTypes.splice(i, 1);
          }
        }
        this.employeeTypes.splice(0, 0, this.employee.employeeTypeId);
      })

      this.departmentService.getdepartmentName().subscribe(data => {
        this.departments = data.details
        for (let i = 0; i < this.departments.length; i++) {
          if (this.departments[i]._id == this.employee.departmentId._id) {
            this.departments.splice(i, 1);
          }
        }
        this.departments.splice(0, 0, this.employee.departmentId);
      })

      this.fillEmployeeDetails()
    });
  }

  goBack(): void {
    this.location.back();
  }

  form = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern("[a-zA-Z]*"),
      StringValidators.cannotCantainSpace
    ], this.shouldBeUniqueU(this.userService)),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z])")
    ]),
    cpassword: new FormControl(''),

    employeeId: new FormControl('', [
      Validators.required,
      Validators.maxLength(7),
      Validators.minLength(7),
      Validators.pattern("[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[A-Z]")
    ], this.shouldBeUniqueE(this.userService)),

    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z]+")
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z]+")
    ]),
  });

  get userName() {
    return this.form.get('userName')
  }

  get password() {
    return this.form.get('password')
  }

  get cpassword() {
    return this.form.get('cpassword')
  }

  get employeeId() {
    return this.form.get('employeeId')
  }

  get firstName() {
    return this.form.get('firstName')
  }

  get lastName() {
    return this.form.get('lastName')
  }
  shouldBeUniqueU(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      control = control.value.trim() ? control.value.trim().charAt(0).toUpperCase() + control.value.trim().substr(1).toLowerCase() : '';
      return userService.isUserNameUnique(control).pipe(map(res => {
        return (res.unique && this.employee.userName != control) ? { shouldBeUnique: true } : null;
      }));
    }
  }

  shouldBeUniqueE(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return userService.isEmployeeIdUnique(control.value).pipe(map(res => {
        return (res.unique && this.employee.employeeId != control.value) ? { shouldBeUnique: true } : null;
      }));
    }
  }

  fillEmployeeDetails(){
    this.form.controls['employeeId'].setValue(this.employee.employeeId);
    this.form.controls['firstName'].setValue(this.employee.firstName);
    this.form.controls['lastName'].setValue(this.employee.lastName);
    this.form.controls['userName'].setValue(this.employee.userName);
  }

  changingImageClick() {
    this.changingImage = true
  }

  saveNewImage() {
    this.changingImage = false
  }
  cancelImage() {
    this.changingImage = false
    this.croppedImage = null
    this.imageChangedEvent = null
    this.profilePicture = null
  }

  changePassword() {
    this.changepassword = true
  }
  cancelPassword() {
    this.changepassword = false
  }

  savePassword(event) {
    const errors = []

    const password = event.target.querySelector('#password').value
    const cpassword = event.target.querySelector('#cpassword').value

    if (password.length === 0) {
      errors.push("Password is empty")
    }
    if (password != cpassword) {
      errors.push("Passwords do not match")
      this.isNotMatch = true
    }

    if (errors.length === 0 && this.password.errors === null) {
      this.userService.changePassword(this.id, password).subscribe(data => {
        if (data.success && data.thisUser) {
          this.router.navigate(['login'])
          window.alert(data.message)
        } else if (data.success && !data.thisUser) {
          this.changepassword = false
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(errors)
    }

  }

  fileChangeEvent(event: any) {
    this.profilePicture = <File>event.target.files[0]
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    fetch(event.base64)
      .then(res => res.blob())
      .then(blob => {
        this.picture = blob
      })
  }

  updateUser(event) {
    event.preventDefault()

    const errors = []

    const employeeId = event.target.querySelector('#employeeId').value
    const fName = event.target.querySelector('#firstName').value
    const lName = event.target.querySelector('#lastName').value
    const uName = event.target.querySelector('#userName').value
    const employeeTypeId = event.target.querySelector('#employeeTypeId').value
    const departmentId = event.target.querySelector('#departmentId').value

    const firstName = fName.trim() ? fName.trim().charAt(0).toUpperCase() + fName.trim().substr(1).toLowerCase() : '';
    const lastName = lName.trim() ? lName.trim().charAt(0).toUpperCase() + lName.trim().substr(1).toLowerCase() : '';
    const userName = uName.trim() ? uName.trim().charAt(0).toUpperCase() + uName.trim().substr(1).toLowerCase() : '';

    const formData = new FormData()
    formData.append('userName', userName)
    formData.append('employeeId', employeeId)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('employeeTypeId', employeeTypeId)
    formData.append('departmentId', departmentId)
    if (this.profilePicture != null) {
      formData.append('profilePicture', this.picture, this.profilePicture.name)
    }

    if (userName.length === 0) {
      errors.push("UserId is empty")
    }

    if (errors.length === 0 && this.employeeId.errors === null && this.userName.errors === null && this.firstName.errors === null && this.lastName.errors === null) {
      this.userService.updateUser(this.id, formData).subscribe(data => {
        if (data.success) {
          this.router.navigate(['employeess'])
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert("Cannot Register Employee, Please check information is corect")
    }

  }

  deactivate() {
    var active: boolean
    if (this.employee.active) {
      active = false
    } else {
      active = true
    }
    this.userService.deleteUser(this.id, active).subscribe(data => {
      if (data.success) {
        this.router.navigate(['employeess'])
        if (active) {
        window.alert("Account has been Activated")
        } else {
          window.alert("Account has been Deactivated")
        }
      } else {
        window.alert('Account can not Change')
      }
    })
  }

}