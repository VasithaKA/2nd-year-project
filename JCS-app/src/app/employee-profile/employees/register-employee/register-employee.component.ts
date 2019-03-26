import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators, AsyncValidatorFn, FormBuilder, FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../../../Auth-services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileTypeService } from 'src/app/Auth-services/profileType.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { StringValidators } from "../../../common-validators/StringValidators";
import { DepartmentService } from 'src/app/Auth-services/department.service';
import { MachineFaultCategoryService } from 'src/app/Auth-services/machine-fault-category.service';
import { SetRoleService } from 'src/app/Auth-services/set-role.service';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  isNotMatch: boolean;
  employeeTypes: any;
  profilePicture: File = null;
  changingImage = false;
  imageChangedEvent: any;
  croppedImage: any;
  picture: any = null;
  departments: any;
  categories: any;
  typeRoles: any;
  value = false;
  faultCategoryId: any;

  constructor(
    private setRoleService: SetRoleService,
    private machineFaultCategoryService: MachineFaultCategoryService,
    private userService: UserService,
    private router: Router,
    private profileTypeService: ProfileTypeService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.profileTypeService.getEmployeeType().subscribe(data => {
      this.employeeTypes = data.details
    })
    this.departmentService.getdepartmentName().subscribe(data => {
      this.departments = data.details
    })
    this.machineFaultCategoryService.getFaultCategory().subscribe(data => {
      this.categories = data.details
    })
  }

  form = new FormGroup({
    faultCategoryId: this.formBuilder.array([]),

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
        return res.unique ? { shouldBeUnique: true } : null;
      }));
    }
  }

  shouldBeUniqueE(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return userService.isEmployeeIdUnique(control.value).pipe(map(res => {
        return res.unique ? { shouldBeUnique: true } : null;
      }));
    }
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

  getRoles(event) {
    this.setRoleService.getTypeRoles(event.target.value).subscribe(data => {
      this.typeRoles = data.rolesForAType
    })
    this.value = false
  }

  setTrue() {
    this.value = true
  }

  onChange(email: string, isChecked: boolean) {
    this.faultCategoryId = <FormArray>this.form.controls.faultCategoryId;

    if (isChecked) {
      this.faultCategoryId.push(new FormControl(email));
    } else {
      let index = this.faultCategoryId.controls.findIndex(x => x.value == email)
      this.faultCategoryId.removeAt(index);
    }
  }

  registerUser(event) {
    event.preventDefault()

    const errors = []

    const employeeId = event.target.querySelector('#employeeId').value
    const fName = event.target.querySelector('#firstName').value
    const lName = event.target.querySelector('#lastName').value
    const uName = event.target.querySelector('#userName').value
    const password = event.target.querySelector('#password').value
    const cpassword = event.target.querySelector('#cpassword').value
    const employeeTypeId = event.target.querySelector('#employeeTypeId').value
    const departmentId = event.target.querySelector('#departmentId').value
    

    const firstName = fName.trim() ? fName.trim().charAt(0).toUpperCase() + fName.trim().substr(1).toLowerCase() : '';
    const lastName = lName.trim() ? lName.trim().charAt(0).toUpperCase() + lName.trim().substr(1).toLowerCase() : '';
    const userName = uName.trim() ? uName.trim().charAt(0).toUpperCase() + uName.trim().substr(1).toLowerCase() : '';

    const formData = new FormData()
    formData.append('userName', userName)
    formData.append('password', password)
    formData.append('employeeId', employeeId)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('employeeTypeId', employeeTypeId)
    formData.append('departmentId', departmentId)
    if (this.faultCategoryId != null) {
      for (let i = 0; i < this.faultCategoryId.value.length; i++) {
        formData.append('faultCategoryId[]', this.faultCategoryId.value[i])
      }
    }
    if (this.profilePicture != null) {
      formData.append('profilePicture', this.picture, this.profilePicture.name)
    }

    if (password != cpassword) {
      errors.push("Passwords do not match")
      this.isNotMatch = true
    }
    if (userName.length === 0) {
      errors.push("User Name is empty")
    }
    if (password.length === 0) {
      errors.push("Password is empty")
    }

    if (errors.length === 0 && this.employeeId.errors === null && this.userName.errors === null && this.password.errors === null && this.firstName.errors === null && this.lastName.errors === null) {
      console.log("ok")
      this.userService.registerEmployee(formData).subscribe(data => {
        if (data.success) {
          this.router.navigate(['employeess'])
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
        //console.log(data)
      })
      // console.log(userId, password, userType)
    } else {
      window.alert("Cannot Register Employee, Please check information is corect")
    }
  }

}
