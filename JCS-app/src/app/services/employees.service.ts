import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient, private router:Router) { }

  getEmpTypes(){
    return this.http.get(`http://localhost:5000/api/employeeTypes/employeetypes`);
  }

  getEmployeeList(id){
    return this.http.get(`http://localhost:5000/api/employees/employeetype`+id);
  }
}
