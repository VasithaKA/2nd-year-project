import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  
  employee = {};
  constructor(private employeeService:EmployeesService,private appRoute: ActivatedRoute,
              private appRoutes: Router) { 
    }

  ngOnInit() {
    this.employeeService.getEmployeeList(this.appRoute.snapshot.params['id']);
  }

}
