import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup , FormControl, Validators } from "@angular/forms";
import { AuthService } from '../../Auth-services/auth.service';
import { ProfileTypeService } from '../../Auth-services/profileType.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string
  success = false

  constructor(
    private authService: AuthService,
    private profileTypeService: ProfileTypeService,
    private router: Router) {}

  ngOnInit() {}

  form = new FormGroup({
    userId: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  get userId(){
    return this.form.get('userId')
  }

  get password(){
    return this.form.get('password')
  }

  loginUser(event){
    this.success = true
    event.preventDefault()
    //const target = event.target
    const userId = event.target.querySelector('#userId').value
    const password = event.target.querySelector('#password').value

    this.authService.getLoginDetails(userId, password).subscribe(data => {
      if (data.success) {
          this.router.navigate(['homepage'])
        //this.authService.setLoggedIn(true)
        //this.profileTypeService.setType(data.userType)
      } else {
        this.form.setErrors({
          invalidLogin: true
        })
        this.message = data.message
        this.success = false
        //window.alert(data.message)
      }
      //this.success = data.success
      //console.log(data.success)
    })
    console.log(userId, password)
  }

}
