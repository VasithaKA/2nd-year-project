import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface employeeRoleDetails {
  setRolesForAType: any
}

interface roleDetails {
  details: any
}

interface setRoleDetails {
  success: boolean,
  message: string
}

interface typeRoles {
  rolesForAType: any
}

interface supervisor {
  supervisors: any
}

interface trueRolesForAType {
  details: any
}

@Injectable({
  providedIn: 'root'
})
export class SetRoleService {

  private employeeRoleUrl = '/api/employeeRoles'
  private roleUrl = '/api/roles'

  constructor(private http: HttpClient) { }

  getEmployeeRolesDetails(_id): Observable<employeeRoleDetails> {
    const url = `${this.employeeRoleUrl}/all/${_id}`;
    return this.http.get<employeeRoleDetails>(url)
  }

  getRolesDetails(): Observable<roleDetails> {
    return this.http.get<roleDetails>(this.roleUrl)
  }

  setRoles(_id, setRoles): Observable<setRoleDetails>  {
    const url = `${this.employeeRoleUrl}/set/${_id}`;
    return this.http.patch<setRoleDetails>(url, {setRoles})
  }

  getTypeRoles(_id): Observable<typeRoles> {
    const url = `${this.employeeRoleUrl}/true/${_id}`;
    return this.http.get<typeRoles>(url)
  }

  getSupervisors(): Observable<supervisor> {
    const url = `${this.employeeRoleUrl}/supervisor/`;
    return this.http.get<supervisor>(url)
  }

  getTrueRolesForAType(employeeTypeId): Observable<trueRolesForAType> {
    const url = `${this.employeeRoleUrl}/employeeType/${employeeTypeId}`;
    return this.http.get<trueRolesForAType>(url)
  }

}
