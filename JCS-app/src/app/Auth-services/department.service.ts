import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface addDepartmentName {
  success: boolean,
  message: string
}

interface departmentName {
  details: any
}

interface departmentNameIsUnique {
  unique: boolean
}

interface departmentDetails {
  departmentDetails: any
}

interface updateDepartment {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentUrl = '/api/departments'

  constructor(private http: HttpClient) { }

  addDepartment(departmentName): Observable<addDepartmentName> {
    return this.http.post<addDepartmentName>(this.departmentUrl, { departmentName })
  }

  getdepartmentName(): Observable<departmentName> {
    return this.http.get<departmentName>(this.departmentUrl)
  }

  isdepartmentName(departmentName): Observable<departmentNameIsUnique> {
    const url = `${this.departmentUrl}/check/${departmentName}`;
    return this.http.get<departmentNameIsUnique>(url)
  }

  getDepartmentDetails(_id): Observable<departmentDetails> {
    const url = `${this.departmentUrl}/${_id}`;
    return this.http.get<departmentDetails>(url)
  }

  updateDepartment(_id, departmentName): Observable<updateDepartment> {
    const url = `${this.departmentUrl}/${_id}`;
    return this.http.patch<updateDepartment>(url, { departmentName })
  }

}
