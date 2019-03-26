import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface setUser {
  user: any,
  userRole: any
}

interface loginData {
  success: boolean,
  message: string
}

interface logoutStatus {
  status: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private employeeTypeUrl = '/api/login'
  private user: any;
  private userRole: any;

  //private loggedInStatus : boolean

  constructor(private http: HttpClient) { }

  /*setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }*/

  setUser(value: any) {
    this.user = value
  }

  get setUserLog() {
    return this.user
  }

  setUserRole(value: any) {
    this.userRole = value
  }

  get setuserRole() {
    return this.userRole
  }

  getUserLog(): Observable<setUser> {
    const url = `${this.employeeTypeUrl}/type`;
    return this.http.get<setUser>(url)
  }

  getLoginDetails(userName, password){
    return this.http.post<loginData>(this.employeeTypeUrl, {
      userName,
      password
    })
  }

  logout() {
    return this.http.get<logoutStatus>(this.employeeTypeUrl)
  }

}