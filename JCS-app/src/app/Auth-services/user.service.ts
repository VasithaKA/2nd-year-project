import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

/*interface isLoggedIn {
  status: boolean
}*/

interface registerResponse {
  success: boolean,
  message: string
}

interface employeesDetails {
  details: any
}

interface employeeDetails {
  aEmpDetails: any
}

interface updateDetails{
  success: boolean
  message: string
}

interface deleteAccount{
  success: boolean
}

interface userNameIsUnique {
  unique: boolean
}

interface changePassword {
  thisUser: boolean
  success: boolean
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private employeeUrl = '/api/employees'

  constructor(private http: HttpClient) { }

  /*isLoggedIn(): Observable<isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin')
  }*/

  isUserNameUnique(userName): Observable<userNameIsUnique> {
    const url = `${this.employeeUrl}/checkUserName/${userName}`;
    return this.http.get<userNameIsUnique>(url)
  }

  isEmployeeIdUnique(employeeId): Observable<userNameIsUnique> {
    const url = `${this.employeeUrl}/checkEmployeeId/${employeeId}`;
    return this.http.get<userNameIsUnique>(url)
  }

  registerEmployee(formData): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.employeeUrl, formData )
  }

  updateUser(_id, formData): Observable<updateDetails>{
    const url = `${this.employeeUrl}/${_id}`;
    return this.http.patch<updateDetails>(url, formData )
  }

  deleteUser(_id, active): Observable<deleteAccount>{
    const url = `${this.employeeUrl}/${_id}`;
    return this.http.put<deleteAccount>(url, {active})
  }

  getEmployeesDetails(): Observable<employeesDetails> {
    return this.http.get<employeesDetails>(this.employeeUrl)
  }

  getEmployeeDetails(_id): Observable<employeeDetails> {
    const url = `${this.employeeUrl}/${_id}`;
    return this.http.get<employeeDetails>(url)
  }

  changePassword(_id, password): Observable<changePassword> {
    const url = `${this.employeeUrl}/password/${_id}`;
    return this.http.patch<changePassword>(url, {password} )
  }
}