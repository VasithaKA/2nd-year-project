import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface addEmployeeType {
  success: boolean,
  message: string
}

interface employeeType {
  details: any
}

interface employeeTypeDetails {
  employeeTypeDetails: any
}

interface updateEmployeeTypeName {
  success: boolean,
  message: string
}

interface deleteUserType {
  success: boolean,
  message: string
}

interface employeeTypeNameIsUnique {
  unique: boolean
}

interface expetiseDetails {
  expert: any
}

@Injectable({
  providedIn: 'root'
})
export class ProfileTypeService {

  private employeeTypeUrl = '/api/employeeTypes'
  private expertiseUrl = '/api/expertises'

  constructor(private http: HttpClient) { }

  addEmployeeType(employeeTypeName): Observable<addEmployeeType> {
    return this.http.post<addEmployeeType>(this.employeeTypeUrl, { employeeTypeName })
  }

  getEmployeeType(): Observable<employeeType> {
    return this.http.get<employeeType>(this.employeeTypeUrl)
  }

  getEmployeeTypeDetails(_id): Observable<employeeTypeDetails> {
    const url = `${this.employeeTypeUrl}/${_id}`;
    return this.http.get<employeeTypeDetails>(url)
  }

  updateEmployeeTypeName(_id, employeeTypeName): Observable<updateEmployeeTypeName> {
    const url = `${this.employeeTypeUrl}/${_id}`;
    return this.http.patch<updateEmployeeTypeName>(url, { employeeTypeName })
  }

  deleteUserType(_id): Observable<deleteUserType> {
    const url = `${this.employeeTypeUrl}/${_id}`;
    return this.http.delete<deleteUserType>(url)
  }

  isemployeeTypeName(employeeTypeName): Observable<employeeTypeNameIsUnique> {
    const url = `${this.employeeTypeUrl}/check/${employeeTypeName}`;
    return this.http.get<employeeTypeNameIsUnique>(url)
  }

  getExpetiseDetails(_id): Observable<expetiseDetails> {
    const url = `${this.expertiseUrl}/expertise/${_id}`;
    return this.http.get<expetiseDetails>(url)
  }

}
